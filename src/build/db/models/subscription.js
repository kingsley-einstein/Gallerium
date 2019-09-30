'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubscriptionSchema = new _mongoose.Schema({
  endpoint: {
    type: String,
    required: {
      message: 'Subscription endpoint required'
    }
  },
  keys: {
    type: String,
    required: {
      message: 'Keys are required'
    }
  },
  subscriber: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

var Subscription = _mongoose2.default.model('Subscription', SubscriptionSchema);

Subscription.findBySubscriber = function (subscriber, cb) {
  return Subscription.findOne({
    subscriber: subscriber
  }, cb);
};

exports.default = Subscription;