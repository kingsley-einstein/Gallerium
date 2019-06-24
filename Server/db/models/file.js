import {Schema, model} from 'mongoose';

const FileSchema = new Schema({
  caption: {
    type: String
  },
  remarks: {
    type: String
  },
  album_id: {
    type: Schema.Types.ObjectId,
    ref: 'Album'
  },
  url: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: {
      message: 'User ID is required'
    }
  }
});

export const Upload = model('File', FileSchema);

