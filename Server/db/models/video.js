import {Schema, model} from 'mongoose';

const VideoSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: {
      message: 'User ID is required'
    }
  },
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String
  }
});

export const Video = model('Video', VideoSchema);
