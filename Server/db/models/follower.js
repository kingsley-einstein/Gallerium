import {Schema, model} from 'mongoose';

const FollowerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

export const Follower = model('Follower', FollowerSchema);
