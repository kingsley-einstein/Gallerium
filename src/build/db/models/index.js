'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _blacklist = require('./blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _subscription = require('./subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _like = require('./like');

var _like2 = _interopRequireDefault(_like);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _follow = require('./follow');

var _follow2 = _interopRequireDefault(_follow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = {
  User: _user2.default,
  Profile: _profile2.default,
  FileItem: _file2.default,
  Blacklist: _blacklist2.default,
  Subscription: _subscription2.default,
  Like: _like2.default,
  Notification: _notification2.default,
  Comment: _comment2.default,
  Follow: _follow2.default
};

exports.default = models;