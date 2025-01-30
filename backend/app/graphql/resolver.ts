// import {User} from "../modules/user/user.model"; // Ensure correct path
// import Message from '../message/message.schema'; // Ensure correct path
// import { PubSub } from 'graphql-subscriptions';
// import authResolvers from '../modules/auth/auth.resolvers'; // Import auth resolvers

// const pubsub = new PubSub();
// const MESSAGE_SENT = 'MESSAGE_SENT';

// interface SendMessageArgs {
//   receiverId: string;
//   content?: string;
//   media?: string;
// }

// interface Context {
//   user?: { userId: string };
// }

// const resolvers = {
//   Query: {
//     users: async () => {
//       return await User.find().select('-password'); // Exclude password for security
//     },
//     messages: async (_: any, { senderId, receiverId }: { senderId: string; receiverId: string }) => {
//       return await Message.find({
//         $or: [
//           { sender: senderId, receiver: receiverId },
//           { sender: receiverId, receiver: senderId },
//         ],
//       }).populate('sender receiver');
//     },
//   },
//   Mutation: {
//     ...authResolvers.Mutation, // Merge auth resolvers (register & login)

//     sendMessage: async (_: any, { receiverId, content, media }: SendMessageArgs, { user }: Context) => {
//       if (!user) {
//         throw new Error('Unauthorized');
//       }

//       const message = new Message({
//         sender: user.userId,
//         receiver: receiverId,
//         content,
//         media,
//       });

//       await message.save();
//       pubsub.publish(MESSAGE_SENT, { messageSent: message, receiverId });

//       return message;
//     },
//   },
//   Subscription: {
//     messageSent: {
//       subscribe: (_: any, { receiverId }: { receiverId: string }) => pubsub.asyncIterator([MESSAGE_SENT]),
//     },
//   },
// };

// export default resolvers;

import { mergeResolvers } from "@graphql-tools/merge";
import authResolvers from "../modules/auth/auth.resolvers";
import chatResolvers from "../modules/chat/chat.resolvers";

const resolvers = mergeResolvers([authResolvers, chatResolvers]);

export default resolvers;
