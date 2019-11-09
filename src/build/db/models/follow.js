'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FollowSchema = new _mongoose.Schema({
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  followed: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

var Follow = _mongoose2.default.model('Follow', FollowSchema);

Follow.findByOwner = function (owner) {
  return Follow.find({
    owner: owner
  });
};

exports.default = Follow;