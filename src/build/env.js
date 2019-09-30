'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var _process = process,
    env = _process.env;


var keys = {
  jwt_secret: env.JWT_SECRET,
  mongo_dev_uri: env.MONGO_DEV_URI,
  mongo_prod_uri: env.MONGO_PROD_URI,
  port: env.PORT,
  node_env: env.NODE_ENV
};

exports.default = keys;