'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middlewares = require('../middlewares');

var _controllers = require('../controllers');

var router = (0, _express.Router)();

router.post('/auth/register', _middlewares.Auth.checkBody, _middlewares.Auth.checkIfExists, _controllers.UserController.create);

router.post('/auth/login/username', _controllers.UserController.loginWithUsername);

router.post('/auth/login/phone', _controllers.UserController.loginWithPhoneNumber);

router.put('/auth/update', _middlewares.Auth.checkToken, _controllers.UserController.update);

router.post('/auth/logout', _middlewares.Auth.checkToken, _controllers.UserController.logout);

router.get('/auth/authenticated_user', _middlewares.Auth.checkToken, _controllers.UserController.getLoggedUser);

router.get('/auth/getAll', _middlewares.Auth.checkToken, _controllers.UserController.getAllUsers);

exports.default = router;