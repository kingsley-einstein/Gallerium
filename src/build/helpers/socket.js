'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Socket = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _pushNotifs = require('../push-notifs');

var _pushNotifs2 = _interopRequireDefault(_pushNotifs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _db$models = _db2.default.models,
    Notification = _db$models.Notification,
    Comment = _db$models.Comment,
    FileItem = _db$models.FileItem,
    Subscription = _db$models.Subscription,
    User = _db$models.User,
    Follow = _db$models.Follow;

/**
 * @author Kingsley Victor
 */

var Socket = exports.Socket = function () {
  function Socket() {
    _classCallCheck(this, Socket);
  }

  _createClass(Socket, null, [{
    key: 'wire',

    /**
     *
     * @param {*} io
     */
    value: function wire(io) {
      var _this = this;

      io.on('connect', function (socket) {
        console.log('Connection made to socket with id: ', socket.id);
        socket.on('GET_ALL_NOTIFICATIONS', function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
            var payload, notifs;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    payload = _jsonwebtoken2.default.decode(data.token);
                    _context.next = 3;
                    return Notification.findByOwner(payload.id);

                  case 3:
                    notifs = _context.sent;

                    io.emit('RECEIVED_NOTIFICATIONS', notifs);

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        socket.on('COUNT_ALL_NOTIFICATIONS', function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
            var payload, count;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    payload = _jsonwebtoken2.default.decode(data.token);
                    _context2.next = 3;
                    return Notification.countByOwnerAndSeen(payload.id, false);

                  case 3:
                    count = _context2.sent;

                    io.emit('RECEIVED_NOTIFS_COUNT', count);

                  case 5:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
        socket.on('CREATE_COMMENT', function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
            var payload, comment, file, commenter, subscription, push_subscription, push_payload;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    payload = _jsonwebtoken2.default.decode(data.token);
                    _context3.next = 3;
                    return Comment.create({
                      madeBy: payload.id,
                      file: data.file_id,
                      actual: data.actual
                    });

                  case 3:
                    comment = _context3.sent;
                    _context3.next = 6;
                    return FileItem.findById(comment.file);

                  case 6:
                    file = _context3.sent;
                    _context3.next = 9;
                    return User.findById(comment.madeBy);

                  case 9:
                    commenter = _context3.sent;
                    _context3.next = 12;
                    return Subscription.findBySubscriber(file.owner);

                  case 12:
                    subscription = _context3.sent;

                    if (subscription) {
                      push_subscription = {
                        endpoint: subscription.endpoint,
                        keys: JSON.parse(subscription.keys)
                      };
                      push_payload = {
                        message: commenter.username + ' commented on your upload: ' + file.caption,
                        title: 'New comment on upload'
                      };

                      _pushNotifs2.default.sendNotification(push_subscription, JSON.stringify(push_payload)).then(function () {
                        console.log('Sent Push');
                      });
                    }
                    _context3.next = 16;
                    return Notification.create({
                      owner: file.owner,
                      message: commenter.username + ' commented on your upload: ' + file.caption,
                      seen: false
                    });

                  case 16:
                    io.emit('NEW_COMMENT', comment);
                    _context3.t0 = io;
                    _context3.next = 20;
                    return Notification.countByOwnerAndSeen(payload.id, false);

                  case 20:
                    _context3.t1 = _context3.sent;

                    _context3.t0.emit.call(_context3.t0, 'RECEIVED_NOTIFS_COUNT', _context3.t1);

                  case 22:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this);
          }));

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        }());
        socket.on('DELETE_COMMENT', function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
            var payload, comment;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    payload = _jsonwebtoken2.default.decode(data.token);
                    _context4.next = 3;
                    return Comment.findOneAndDelete({
                      madeBy: payload.id
                    });

                  case 3:
                    comment = _context4.sent;

                    io.emit('COMMENT_DELETED', comment);

                  case 5:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this);
          }));

          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }());
        socket.on('FOLLOW', function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
            var token, followed, payload, follow, follower, subscription, push_subscription, push_payload;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    token = data.token, followed = data.followed;
                    payload = _jsonwebtoken2.default.decode(token);
                    _context5.next = 4;
                    return Follow.create({
                      owner: payload.id,
                      followed: followed
                    });

                  case 4:
                    follow = _context5.sent;
                    _context5.next = 7;
                    return User.findById(follow.owner);

                  case 7:
                    follower = _context5.sent;
                    _context5.next = 10;
                    return Subscription.findByOwner(follow.followed);

                  case 10:
                    subscription = _context5.sent;

                    if (subscription) {
                      push_subscription = {
                        endpoint: subscription.endpoint,
                        keys: JSON.parse(subscription.keys)
                      };
                      push_payload = {
                        message: follower.username + ' followed you',
                        title: 'Someone followed you'
                      };

                      _pushNotifs2.default.sendNotification(push_subscription, JSON.stringify(push_payload)).then(function () {
                        console.log('Sent push');
                      });
                    }
                    _context5.next = 14;
                    return Notification.create({
                      owner: follow.followed,
                      message: follower.username + ' followed you',
                      seen: false
                    });

                  case 14:
                    _context5.t0 = io;
                    _context5.next = 17;
                    return Notification.countByOwnerAndSeen(payload.id, false);

                  case 17:
                    _context5.t1 = _context5.sent;

                    _context5.t0.emit.call(_context5.t0, 'RECEIVED_NOTIFS_COUNT', _context5.t1);

                  case 19:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this);
          }));

          return function (_x5) {
            return _ref5.apply(this, arguments);
          };
        }());
        socket.on('LIKE', function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(data) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, _this);
          }));

          return function (_x6) {
            return _ref6.apply(this, arguments);
          };
        }());
      });
    }
  }]);

  return Socket;
}();