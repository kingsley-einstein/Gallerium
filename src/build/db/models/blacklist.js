'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlacklistSchema = new _mongoose.Schema({
  token: {
    type: String,
    required: {
      message: 'Token is required'
    }
  }
});

var Blacklist = _mongoose2.default.model('Blacklist', BlacklistSchema);

Blacklist.findByToken = function (token) {
  return Blacklist.findOne({
    token: token
  });
};

exports.default = Blacklist;