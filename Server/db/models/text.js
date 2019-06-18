import {Schema, model} from 'mongoose';

const TextSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  actual_text: {
    type: String,
    required: true,
    maxlength: 8000
  },
  message_id: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }
});

export const Text = model('Text', TextSchema);
