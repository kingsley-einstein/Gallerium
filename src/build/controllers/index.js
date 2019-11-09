'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionController = exports.LikeController = exports.FileController = exports.ProfileController = exports.UserController = undefined;

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _like = require('./like');

var _like2 = _interopRequireDefault(_like);

var _subscription = require('./subscription');

var _subscription2 = _interopRequireDefault(_subscription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.UserController = _user2.default;
exports.ProfileController = _profile2.default;
exports.FileController = _file2.default;
exports.LikeController = _like2.default;
exports.SubscriptionController = _subscription2.default;