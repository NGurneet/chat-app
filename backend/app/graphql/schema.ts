// import { gql } from 'apollo-server-express';
// import authTypeDefs from '../modules/auth/auth.schema'; // Import auth schema
// import chatResolvers from '../modules/chat/chat.resolvers';

// const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     online: Boolean!
//   }

//   type Message {
//     id: ID!
//     sender: User!
//     receiver: User!
//     content: String
//     media: String
//     status: String!
//     createdAt: String!
//   }

//   type Query {
//     users: [User]
//     messages(senderId: ID!, receiverId: ID!): [Message]
//   }

//   type Mutation {
//     sendMessage(receiverId: ID!, content: String, media: String): Message
//   }

//   type Subscription {
//     messageSent(receiverId: ID!): Message
//   }
   
// `;

// export default [typeDefs, authTypeDefs]; // Merge schemas properly


import { mergeTypeDefs } from "@graphql-tools/merge";
import authTypeDefs from "../modules/auth/auth.schema"; 
import chatTypeDefs from "../modules/chat/chat.schema"; // Import chat schema

const typeDefs = mergeTypeDefs([authTypeDefs, chatTypeDefs]); 

export default typeDefs;
