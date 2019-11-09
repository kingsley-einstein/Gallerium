'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middlewares = require('../middlewares');

var _controllers = require('../controllers');

var router = (0, _express.Router)();

router.post('/profile', _middlewares.Auth.checkToken, _controllers.ProfileController.create);

router.put('/profile', _middlewares.Auth.checkToken, _controllers.ProfileController.update);

router.get('/profile', _middlewares.Auth.checkToken, _controllers.ProfileController.getUserProfile);

router.get('/profile/:user_id', _middlewares.Auth.checkToken, _controllers.ProfileController.getAnotherUserProfile);

exports.default = router;