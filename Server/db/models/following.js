import {Schema, model} from 'mongoose';

const FollowingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

export const Following = model('Following', FollowingSchema);
