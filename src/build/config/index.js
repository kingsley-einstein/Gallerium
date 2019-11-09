'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _middlewares = require('../middlewares');

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, _ref) {
  var statics = _ref.statics,
      json = _ref.json,
      urlencoded = _ref.urlencoded;

  var isDevelopment = _env2.default.node_env === 'development';
  app.use(_middlewares.cors);
  if (isDevelopment) {
    app.use(require('morgan')('dev'));
  }
  app.use(json());
  app.use(urlencoded({
    extended: false
  }));
  app.use(statics(_path2.default.join(__dirname, '../../Client/static'), {
    setHeaders: function setHeaders(res, loc, stat) {
      res.set('Service-Worker-Allowed', '/');
    }
  }));
  app.use('/api/v1', _routes2.default);
  (0, _client2.default)(app);
};