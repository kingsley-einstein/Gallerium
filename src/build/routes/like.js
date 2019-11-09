'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middlewares = require('../middlewares');

var _controllers = require('../controllers');

var router = (0, _express.Router)();

router.post('/like/:file_id', _middlewares.Auth.checkToken, _middlewares.Likes.checkIfPreviouslyLiked, _controllers.LikeController.create);

router.delete('/unlike/:file_id', _middlewares.Auth.checkToken, _middlewares.Likes.canUnlike, _controllers.LikeController.unlike);

exports.default = router;