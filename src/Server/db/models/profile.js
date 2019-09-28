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
    ref: 'User'
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
