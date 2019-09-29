'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

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

exports.default = router;