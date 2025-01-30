// modules/auth/schema.ts
import { gql } from 'apollo-server-express';

const authTypeDefs = gql`
  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload
    login(input: LoginInput!): AuthPayload
  }
`;

export default authTypeDefs;
