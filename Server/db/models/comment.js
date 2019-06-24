import {Schema, model} from 'mongoose';

const CommentSchema = new Schema({
  content: {
    type: String,
    required: {
      message: 'Comment cannot be empty'
    }
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // picture_id: {
  //   type: Schema.Types.ObjectId,
  //   required: false,
  //   ref: 'Picture'
  // },
  // video_id: {
  //   type: Schema.Types.ObjectId,
  //   required: false,
  //   ref: 'Video'
  // }
  file_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'File'
  }
});

export const Comment = model('Comment', CommentSchema);
