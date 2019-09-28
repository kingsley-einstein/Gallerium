import mongoose, {Schema} from 'mongoose';

const FileSchema = new Schema({
  caption: {
    type: String
  },
  description: {
    type: String
  },
  bytes: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const FileItem = mongoose.model('File', FileSchema);

export default FileItem;
