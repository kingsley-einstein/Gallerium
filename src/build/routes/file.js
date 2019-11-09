'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middlewares = require('../middlewares');

var _controllers = require('../controllers');

var _multipart = require('../multipart');

var _multipart2 = _interopRequireDefault(_multipart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/upload', _middlewares.Auth.checkToken, (0, _multipart2.default)().array('picture'), _middlewares.parseFiles, _controllers.FileController.create);

router.get('/upload', _middlewares.Auth.checkToken, _controllers.FileController.getAllByUser);

router.get('/upload:user_id', _middlewares.Auth.checkToken, _controllers.FileController.getAllByAnotherUser);

router.get('/upload/:file_id', _middlewares.Auth.checkToken, _controllers.FileController.getFile);

router.delete('/upload', _middlewares.Auth.checkToken, _controllers.FileController.delete);

router.delete('/upload/:file_id', _middlewares.Auth.checkToken, _controllers.FileController.deleteOne);

exports.default = router;