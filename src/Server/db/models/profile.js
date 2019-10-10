import mongoose, {Schema} from 'mongoose';

const ProfileSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  dob: {
    type: Date
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: {
      message: 'User already has a profile'
    }
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', ProfileSchema);

Profile.findByOwner = (owner) => Profile.findOne({
  owner
});

Profile.updateByOwner = (owner, update) => Profile.findOneAndUpdate({
  owner
}, update, {
  useFindAndModify: false,
  new: true
});

export default Profile;
