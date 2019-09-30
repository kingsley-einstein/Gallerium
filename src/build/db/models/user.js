'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.Schema({
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

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line no-invalid-this
  var user = this;
  if (user.isModified('password')) {
    var salt = _bcryptjs2.default.genSaltSync(15);
    user.password = _bcryptjs2.default.hashSync(user.password, salt);
    next();
  }
});

var User = _mongoose2.default.model('User', UserSchema);

User.findByUsername = function (username) {
  return User.findOne({
    username: username
  });
};

User.findByPhoneNumber = function (phone_number) {
  return User.findOne({
    phone_number: phone_number
  });
};

exports.default = User;