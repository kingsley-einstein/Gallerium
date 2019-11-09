'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

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

var router = (0, _express.Router)();

router.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Gallerium API'
  });
});

router.use('/', _user2.default);
router.use('/', _profile2.default);
router.use('/', _file2.default);
router.use('/', _like2.default);
router.use('/', _subscription2.default);

exports.default = router;