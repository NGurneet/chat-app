import { gql } from "apollo-server-express";

const chatTypeDefs = gql`
  type Message {
    id: ID!
    sender: User!
    receiver: User!
    content: String
    media: String
    status: String!
    createdAt: String!
  }

  type Subscription {
    messageSent(receiverId: ID!): Message
  }

  type Query {
    messages(senderId: ID!, receiverId: ID!): [Message]
  }

  type Mutation {
    sendMessage(receiverId: ID!, content: String, media: String): Message
  }
`;

export default chatTypeDefs;
