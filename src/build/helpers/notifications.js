'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = undefined;

var _pushNotifs = require('../push-notifs');

var _pushNotifs2 = _interopRequireDefault(_pushNotifs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notify = exports.notify = function notify(subscription, payload) {
  return _pushNotifs2.default.sendNotification({
    endpoint: subscription.endpoint,
    keys: JSON.parse(subscription.keys)
  }, payload);
};