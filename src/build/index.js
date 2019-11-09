'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var appOpts = {
  statics: _express2.default.static,
  json: _express2.default.json,
  urlencoded: _express2.default.urlencoded
};

(0, _config2.default)(app, appOpts);

var port = _env2.default.port,
    mongo_dev_uri = _env2.default.mongo_dev_uri,
    mongo_prod_uri = _env2.default.mongo_prod_uri,
    mongo_test_uri = _env2.default.mongo_test_uri,
    node_env = _env2.default.node_env;

// Object with keys specifying environments. URIs specific to each environment would be loaded

var mongo_uris = {
  development: mongo_dev_uri,
  production: mongo_prod_uri,
  test: mongo_test_uri
};

// Select DB URI to use based on environment
var MONGO_URI = mongo_uris[node_env];

// MongoDB options
var mongo_opts = {
  useNewUrlParser: true
};

_mongoose2.default.connect(MONGO_URI, mongo_opts, function (error) {
  if (error) {
    throw new Error(JSON.stringify({
      error: error
    }));
  }
  var server = app.listen(port[node_env], function () {
    var IO = (0, _socket2.default)(server);
    _helpers.Socket.wire(IO);
    console.log('Server listening on ' + port[node_env]);
  });
});

// Export app for test purposes
exports.default = app;