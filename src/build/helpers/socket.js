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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notification = _db2.default.models.Notification;

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
      });
    }
  }]);

  return Socket;
}();