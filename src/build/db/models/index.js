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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = {
  User: _user2.default,
  Profile: _profile2.default,
  FileItem: _file2.default,
  Blacklist: _blacklist2.default,
  Subscription: _subscription2.default
};

exports.default = models;