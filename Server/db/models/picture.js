import {Schema, model} from 'mongoose';

const PictureSchema = new Schema(
    {
      caption: {
        type: String,
        required: false
      },
      url: {
        type: String,
        required: true
      },
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      album_id: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
      }
    },
    {
      timestamps: true
    }
);

export const Picture = model('Picture', PictureSchema);
