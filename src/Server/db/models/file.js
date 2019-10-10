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
  mimeType: {
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

FileItem.findAllByOwner = (owner) => FileItem.find({
  owner
});

FileItem.deleteByOwner = (owner) => FileItem.deleteMany({
  owner
});

FileItem.deleteByOwnerAndId = (owner, _id) => FileItem.deleteOne({
  owner,
  _id
});


export default FileItem;
