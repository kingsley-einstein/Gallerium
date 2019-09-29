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
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var FileItem = _mongoose2.default.model('File', FileSchema);

exports.default = FileItem;