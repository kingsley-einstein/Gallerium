'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileSchema = new _mongoose.Schema({
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
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var Profile = _mongoose2.default.model('Profile', ProfileSchema);

Profile.updateByOwner = function (owner, update) {
  return Profile.findOneAndUpdate({
    owner: owner
  }, update, {
    useFindAndModify: false,
    new: true
  });
};

exports.default = Profile;