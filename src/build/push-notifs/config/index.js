'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_webPush2.default.setVapidDetails('mailto:' + _env2.default.mailto, _env2.default.push_public_key, _env2.default.push_private_key);

exports.default = _webPush2.default;