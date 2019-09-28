import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username: {
    type: String,
    required: {
      message: 'Username is required'
    }
  },
  password: {
    type: String,
    required: {
      message: 'Password is required'
    }
  },
  phone_number: {
    type: String,
    required: {
      message: 'Phone number is required'
    }
  }
}, {
  timestamps: true
});

UserSchema.pre('save', function(next) {
  // eslint-disable-next-line no-invalid-this
  const user = this;
  if (user.isModified('password')) {
    const salt = bcrypt.genSaltSync(15);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  }
});

const User = mongoose.model('User', UserSchema);

User.findByUsername = (username, cb) => User.findOne({
  username
}, cb);

User.findByPhoneNumber = (phone_number, cb) => User.findOne({
  phone_number
}, cb);

export default User;
