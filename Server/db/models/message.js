import {Schema, model} from 'mongoose';

const MessageSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recepient_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const Message = model('Message', MessageSchema);
