'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Express} app
 */
/* eslint-disable no-unused-vars */
exports.default = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/index.html'));
  });
  app.get('/login', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/login.html'));
  });
  app.get('/signup', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/signup.html'));
  });
  app.get('/home', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/home.html'));
  });
  app.get('/home/feeds', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/feeds.html'));
  });
  app.get('/home/profile', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/profile.html'));
  });
  app.get('/home/upload', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/upload.html'));
  });
  app.get('/home/settings', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/settings.html'));
  });
  app.get('/home/search', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../Client/views/search.html'));
  });
};