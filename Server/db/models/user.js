import {Schema, model} from 'mongoose';
import {genSalt, hash} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import Environment from '../../environment';

const {secretOrKey} = new Environment();

const UserSchema = new Schema(
    {
      username: {
        type: String,
        required: {
          message: 'Username is required'
        },
        unique: true
      },
      password: {
        type: String,
        required: {
          message: 'Password is required'
        }
      },
      first_name: {
        type: String,
        required: false
      },
      last_name: {
        type: String,
        required: false
      },
      token: {
        type: String
      }
    },
    {
      timestamps: true
    }
);

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    genSalt(10, (err, salt) => {
      hash(user.password, salt, (err, generated) => {
        user.password = generated;
        const {username, password} = user;
        user.token = sign({username, password}, secretOrKey);
        next(err);
      });
    });
  }
});

export const User = model('User', UserSchema);
