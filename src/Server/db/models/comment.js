import mongoose, {Schema} from 'mongoose';

const CommentSchema = new Schema({
  madeBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: 'File'
  },
  actual: {
    type: String,
    required: {
      message: 'Actual message is required'
    }
  }
});

export default mongoose.model('Comment', CommentSchema);
