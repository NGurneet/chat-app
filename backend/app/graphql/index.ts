import { mergeTypeDefs } from "@graphql-tools/merge";
import authTypeDefs from "../modules/auth/auth.schema"; 
import chatTypeDefs from "../modules/chat/chat.schema"; // Import chat schema

const typeDefs = mergeTypeDefs([authTypeDefs, chatTypeDefs]); 

export default typeDefs;
