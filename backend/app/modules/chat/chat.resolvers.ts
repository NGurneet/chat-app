// import { Message } from '../../modules/chat/entity/message.entity';
// import { PubSub } from 'graphql-subscriptions';

// const pubsub = new PubSub();

// export const chatResolvers = {
//   Query: {
//     async getMessages(_: any, { receiverId }: any, { user }: any) {
//       return await Message.find({ $or: [{ senderId: user.id, receiverId }, { senderId: receiverId, receiverId: user.id }] }).sort({ createdAt: 1 });
//     }
//   },

//   Mutation: {
//     async sendMessage(_: any, { receiverId, content, mediaUrl }: any, { user }: any) {
//       const message = await Message.create({ senderId: user.id, receiverId, content, mediaUrl });
//       pubsub.publish(`MESSAGE_RECEIVED_${receiverId}`, { messageReceived: message });
//       return message;
//     }
//   },

//   Subscription: {
//     messageReceived: {
//       subscribe(_: any, { receiverId }: any) {
//         return pubsub.asyncIterator(`MESSAGE_RECEIVED_${receiverId}`);
//       }
//     }
//   }
// };

import { PubSub } from "graphql-subscriptions";
import Message from "../../message/message.schema"; // Message Model
import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../graphql/types/context";
import { User } from "../user/user.model";
import messageSchema from "../../message/message.schema";

const pubsub = new PubSub();
const MESSAGE_SENT = "MESSAGE_SENT";

const chatResolvers = {
  Query: {
    messages: async (_: any, { senderId, receiverId }: { senderId: string; receiverId: string }) => {
      return await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      }).populate("sender receiver");
    },
  },

  Mutation: {
    // sendMessage: async (
    //     _: any,
    //     { receiverId, content, media }: { receiverId: string; content?: string; media?: string },
    //     context: GraphQLContext
    //   ) => {
    //     console.log("User Context:", context.user); // Debugging line
      
    //     if (!context.user) {
    //       throw new Error("Unauthorized: No user found in context");
    //     }
      
    //     const sender = await User.findById(context.user.id);
    //     console.log("Sender Found:", sender); // Debugging line
      
    //     if (!sender) {
    //       throw new Error("Sender not found");
    //     }
      
    //     const receiver = await User.findById(receiverId);
    //     if (!receiver) {
    //       throw new Error("Receiver not found");
    //     }
  
    //     const message = new messageSchema({
    //       sender: sender._id,
    //       receiver: receiver._id,
    //       content,
    //       media,
    //       status: "sent",
    //       createdAt: new Date(),
    //     });
  
    //     await message.save();
  
    //     // Populate sender and receiver before returning
    //     const populatedMessage = await messageSchema.findById(message._id)
    //       .populate("sender", "id username")
    //       .populate("receiver", "id username");
  
    //     pubsub.publish(MESSAGE_SENT, { messageSent: populatedMessage, receiverId });
  
    //     return populatedMessage;
    //   },
    sendMessage: async (
        _: any,
        { receiverId, content, media }: { receiverId: string; content?: string; media?: string },
        context: GraphQLContext
      ) => {
        console.log("🚀 User Context:", context); // Debugging line
        
        if (!context.user || !context.user.id) {
          throw new Error("Unauthorized: No user found in context");
        }
      
        const sender = await User.findById(context.user.id);
        console.log("🔥 Sender Found:", sender); // Debugging line
      
        if (!sender) {
          throw new Error("Sender not found");
        }
      
        const receiver = await User.findById(receiverId);
        if (!receiver) {
          throw new Error("Receiver not found");
        }
      
        const message = new messageSchema({
          sender: sender._id,
          receiver: receiver._id,
          content,
          media,
          status: "sent",
          createdAt: new Date(),
        });
      
        await message.save();
        return message;
      }
   
  },

  Subscription: {
    messageSent: {
        subscribe: async (
            _: any,
            { receiverId }: { receiverId: string },
            context: GraphQLContext
          ) => {
            const { user } = context;
            if (!user) {
              throw new Error("Unauthorized");
            }
            return pubsub.asyncIterator([MESSAGE_SENT]);
          }
    },
  },
};

export default chatResolvers;
