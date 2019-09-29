'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

Object.defineProperty(exports, 'Auth', {
  enumerable: true,
  get: function get() {
    return _auth.Auth;
  }
});

var _cors = require('./cors');

Object.defineProperty(exports, 'cors', {
  enumerable: true,
  get: function get() {
    return _cors.cors;
  }
});