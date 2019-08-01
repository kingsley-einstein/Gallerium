import {Schema, model} from 'mongoose';

const LikeSchema = new Schema({
  upload_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'File'
  },
  liked_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export const Like = model('Like', LikeSchema);
