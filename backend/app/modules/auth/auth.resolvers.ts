import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model'; // Ensure you have a User model for database interactions
import { GraphQLError } from 'graphql';

// Helper function to generate JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: { input: { username: string; email: string; password: string } }) => {
      const { username, email, password } = input;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new GraphQLError('User with this email already exists', {
          extensions: { code: 'USER_ALREADY_EXISTS' },
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = generateToken(newUser.id);

      return { token, user: newUser };
    },

    login: async (_: any, { input }: { input: { username: string; password: string } }) => {
      const { username, password } = input;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'USER_NOT_FOUND' },
        });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new GraphQLError('Invalid password', {
          extensions: { code: 'INVALID_PASSWORD' },
        });
      }

      // Generate JWT token
      const token = generateToken(user.id);

      return { token, user };
    },
  },
};

export default authResolvers;
