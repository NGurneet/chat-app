import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String },
}, { timestamps: true });

export const Message = model('Message', MessageSchema);
