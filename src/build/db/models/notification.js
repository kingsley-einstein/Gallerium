'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationSchema = new _mongoose.Schema({
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  }
});

var Notification = _mongoose2.default.model('Notification', NotificationSchema);

Notification.findByOwner = function (owner) {
  return Notification.find({
    owner: owner
  });
};

Notification.countByOwnerAndSeen = function (owner, seen) {
  return Notification.count({
    owner: owner,
    seen: seen
  });
};

Notification.setSeen = function (owner) {
  return Notification.updateMany({
    owner: owner,
    seen: false
  }, {
    seen: true
  });
};

exports.default = Notification;