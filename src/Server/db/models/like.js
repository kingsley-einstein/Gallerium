import mongoose, {Schema} from 'mongoose';

const LikeSchema = new Schema({
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: 'File'
  }
});

const Like = mongoose.model('Like', LikeSchema);

Like.findByLikedByAndFile = (likedBy, file) => Like.findOne({
  likedBy,
  file
});

Like.countByFile = (file) => Like.count({
  file
});

export default Like;
