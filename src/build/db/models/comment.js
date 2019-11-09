'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentSchema = new _mongoose.Schema({
  madeBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  file: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  actual: {
    type: String,
    required: {
      message: 'Actual message is required'
    }
  }
});

exports.default = _mongoose2.default.model('Comment', CommentSchema);