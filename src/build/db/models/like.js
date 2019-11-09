'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LikeSchema = new _mongoose.Schema({
  likedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }
});

var Like = _mongoose2.default.model('Like', LikeSchema);

Like.findByLikedByAndFile = function (likedBy, file) {
  return Like.findOne({
    likedBy: likedBy,
    file: file
  });
};

Like.countByFile = function (file) {
  return Like.count({
    file: file
  });
};

Like.deleteByLikedByAndFile = function (likedBy, file) {
  return Like.deleteOne({
    likedBy: likedBy,
    file: file
  });
};

exports.default = Like;