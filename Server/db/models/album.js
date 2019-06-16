import {Schema, model} from 'mongoose';

const AlbumSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String
  }
});

export const Album = model('Album', AlbumSchema);
