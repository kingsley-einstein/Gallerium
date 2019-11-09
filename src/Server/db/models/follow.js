import mongoose, {Schema} from 'mongoose';

const FollowSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  followed: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Follow = mongoose.model('Follow', FollowSchema);

Follow.findByOwner = (owner) => Follow.find({
  owner
});

export default Follow;
