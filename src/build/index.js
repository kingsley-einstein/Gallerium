'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

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
    node_env = _env2.default.node_env;

var mongo_uris = {
  development: mongo_dev_uri,
  production: mongo_prod_uri
};
var MONGO_URI = mongo_uris[node_env];
var mongo_opts = {
  socketOptions: {
    keepAlive: true
  },
  useNewUrlParser: true
};

_mongoose2.default.connect(MONGO_URI, mongo_opts, function (error) {
  if (error) {
    throw new Error(JSON.stringify({
      error: error
    }));
  }
  app.listen(port, function () {
    console.log('Server listening on ' + port);
  });
});