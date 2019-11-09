'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileSchema = new _mongoose.Schema({
  caption: {
    type: String
  },
  description: {
    type: String
  },
  bytes: {
    type: String
  },
  mimeType: {
    type: String
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var FileItem = _mongoose2.default.model('File', FileSchema);

FileItem.findAllByOwner = function (owner) {
  return FileItem.find({
    owner: owner
  });
};

FileItem.deleteByOwner = function (owner) {
  return FileItem.deleteMany({
    owner: owner
  });
};

FileItem.deleteByOwnerAndId = function (owner, _id) {
  return FileItem.deleteOne({
    owner: owner,
    _id: _id
  });
};

exports.default = FileItem;