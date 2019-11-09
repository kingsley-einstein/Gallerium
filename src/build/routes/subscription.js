'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middlewares = require('../middlewares');

var _controllers = require('../controllers');

var router = (0, _express.Router)();

router.post('/subscribe', _middlewares.Auth.checkToken, _middlewares.Subscriptions.checkIfSubscribed, _controllers.SubscriptionController.create);

router.delete('/unsubscribe', _middlewares.Auth.checkToken, _controllers.SubscriptionController.delete);

exports.default = router;