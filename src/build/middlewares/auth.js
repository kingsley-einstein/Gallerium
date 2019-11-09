'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _helpers = require('../helpers');

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _db$models = _db2.default.models,
    Blacklist = _db$models.Blacklist,
    User = _db$models.User;

/**
 * @author Kingsley Victor
 */

var Auth = exports.Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: 'checkToken',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var authorization, token, validToken, blacklisted, decoded, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                authorization = req.headers.authorization;

                if (authorization) {
                  _context.next = 4;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: 'Auth header not present in request'
                });
                return _context.abrupt('return');

              case 4:
                token = authorization.split(' ')[1];

                if (token) {
                  _context.next = 8;
                  break;
                }

                res.status(401).json({
                  status: 401,
                  error: 'Token not found in auth header'
                });
                return _context.abrupt('return');

              case 8:
                _context.next = 10;
                return new Promise(function (resolve) {
                  _jsonwebtoken2.default.verify(token, _env2.default.jwt_secret, null, function (err, decoded) {
                    resolve(decoded);
                  });
                });

              case 10:
                validToken = _context.sent;

                if (validToken) {
                  _context.next = 14;
                  break;
                }

                res.status(401).json({
                  status: 401,
                  error: 'Token is invalid'
                });
                return _context.abrupt('return');

              case 14:
                _context.next = 16;
                return new Promise(function (resolve) {
                  Blacklist.findByToken(token).then(function (item) {
                    resolve(item);
                  });
                });

              case 16:
                blacklisted = _context.sent;

                if (!blacklisted) {
                  _context.next = 20;
                  break;
                }

                res.status(401).json({
                  status: 401,
                  error: 'User must be logged in to access this resource'
                });
                return _context.abrupt('return');

              case 20:
                decoded = _jsonwebtoken2.default.decode(token);
                _context.next = 23;
                return new Promise(function (resolve) {
                  User.findById(decoded.id).then(function (item) {
                    resolve(item);
                  });
                });

              case 23:
                user = _context.sent;

                if (user) {
                  req.user = user;
                  req.token = token;
                  next();
                } else {
                  res.status(401).json({
                    status: 401,
                    error: 'Unable to authenticate'
                  });
                }

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return checkToken;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     */

  }, {
    key: 'checkBody',
    value: function checkBody(req, res, next) {
      var body = req.body;

      var requiredKeys = ['username', 'password', 'phone_number'];
      if (!_helpers.Keys.contains(body, requiredKeys)) {
        res.status(400).json({
          status: 400,
          error: 'Missing required keys ' + _helpers.Keys.missing(body, requiredKeys)
        });
        return;
      }
      var keysMatchTypes = _helpers.Keys.keysAreOfTypes(body, {
        username: 'string',
        password: 'string',
        phone_number: 'string'
      });
      if (!keysMatchTypes) {
        res.status(400).json({
          status: 400,
          error: 'Certain body params are invalid'
        });
        return;
      }
      next();
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     */

  }, {
    key: 'checkIfExists',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var username, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                username = req.body.username;
                _context2.next = 3;
                return new Promise(function (resolve) {
                  User.findByUsername(username).then(function (u) {
                    resolve(u);
                  });
                });

              case 3:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 7;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: 'There is a user with that username'
                });
                return _context2.abrupt('return');

              case 7:
                next();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkIfExists(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return checkIfExists;
    }()
  }]);

  return Auth;
}();