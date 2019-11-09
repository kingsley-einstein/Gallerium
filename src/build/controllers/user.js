'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../helpers');

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _db$models = _db2.default.models,
    User = _db$models.User,
    Blacklist = _db$models.Blacklist;

/**
 * @author Kingsley Victor
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'create',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var body, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body;
                _context.next = 4;
                return new Promise(function (resolve) {
                  User.create(body).then(function (user) {
                    var _id = user._id,
                        username = user.username,
                        password = user.password,
                        phone_number = user.phone_number;

                    var jwt_payload = {
                      id: _id,
                      password: password
                    };
                    var sent = {
                      id: _id,
                      username: username,
                      phone_number: phone_number,
                      token: _helpers.Encryptions.tokenize(jwt_payload)
                    };
                    resolve(sent);
                  });
                });

              case 4:
                data = _context.sent;

                res.status(201).json({
                  status: 201,
                  data: data
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context.t0
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'loginWithUsername',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, username, password, user, _id, phone_number, jwt_payload, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, username = _req$body.username, password = _req$body.password;
                _context2.next = 4;
                return new Promise(function (resolve) {
                  User.findByUsername(username).then(function (item) {
                    resolve(item);
                  });
                });

              case 4:
                user = _context2.sent;

                if (user) {
                  _context2.next = 8;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'User not found'
                });
                return _context2.abrupt('return');

              case 8:
                if (_helpers.Encryptions.compare(password, user.password)) {
                  _context2.next = 11;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: 'Incorrect password'
                });
                return _context2.abrupt('return');

              case 11:
                _id = user._id, phone_number = user.phone_number;
                jwt_payload = {
                  id: _id,
                  password: user.password
                };
                data = {
                  id: _id,
                  username: username,
                  phone_number: phone_number,
                  token: _helpers.Encryptions.tokenize(jwt_payload)
                };

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context2.t0
                });

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 17]]);
      }));

      function loginWithUsername(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return loginWithUsername;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'loginWithPhoneNumber',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$body2, phone_number, password, user, _id, username, jwt_payload, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body2 = req.body, phone_number = _req$body2.phone_number, password = _req$body2.password;
                _context3.next = 4;
                return new Promise(function (resolve) {
                  User.findByPhoneNumber(phone_number).then(function (item) {
                    resolve(item);
                  });
                });

              case 4:
                user = _context3.sent;

                if (user) {
                  _context3.next = 8;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'User not found'
                });
                return _context3.abrupt('return');

              case 8:
                if (_helpers.Encryptions.compare(password, user.password)) {
                  _context3.next = 11;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: 'Incorrect password'
                });
                return _context3.abrupt('return');

              case 11:
                _id = user._id, username = user.username;
                jwt_payload = {
                  id: _id,
                  password: user.password
                };
                data = {
                  id: _id,
                  username: username,
                  phone_number: phone_number,
                  token: _helpers.Encryptions.tokenize(jwt_payload)
                };

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context3.t0
                });

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 17]]);
      }));

      function loginWithPhoneNumber(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return loginWithPhoneNumber;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'update',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var user, body, item, _id, phone_number, username, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                user = req.user, body = req.body;
                _context4.next = 4;
                return new Promise(function (resolve) {
                  User.findById(user._id).then(function (value) {
                    Object.keys(body).forEach(function (key) {
                      value[key] = body[key];
                    });
                    value.save();
                    resolve(value);
                  });
                });

              case 4:
                item = _context4.sent;
                _id = item._id, phone_number = item.phone_number, username = item.username;
                data = {
                  id: _id,
                  phone_number: phone_number,
                  username: username
                };

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context4.t0
                });

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 10]]);
      }));

      function update(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'logout',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var user, token, blacklist, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                user = req.user, token = req.token;
                _context5.next = 4;
                return new Promise(function (resolve) {
                  Blacklist.create({ token: token }).then(function (item) {
                    resolve(item);
                  });
                });

              case 4:
                blacklist = _context5.sent;
                data = {
                  message: 'Successfully signed out user ' + user.username,
                  blacklist: blacklist
                };

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context5.t0
                });

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 9]]);
      }));

      function logout(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return logout;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'getLoggedUser',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var user, data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                try {
                  user = req.user;
                  data = {
                    id: user._id,
                    username: user.username
                  };

                  res.status(200).json({
                    status: 200,
                    data: data
                  });
                } catch (error) {
                  res.status(500).json({
                    status: 500,
                    error: error
                  });
                }

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getLoggedUser(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return getLoggedUser;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'getAllUsers',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return new Promise(function (resolve) {
                  User.find().then(function (docs) {
                    resolve(docs);
                  });
                });

              case 3:
                data = _context7.sent;

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context7.next = 10;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context7.t0
                });

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 7]]);
      }));

      function getAllUsers(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;