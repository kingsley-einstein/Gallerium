'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = _db2.default.models.Subscription;

/**
 * @author Kingsley Victor
 */

var SubscriptionController = function () {
  function SubscriptionController() {
    _classCallCheck(this, SubscriptionController);
  }

  _createClass(SubscriptionController, null, [{
    key: 'create',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user, body, _data, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                user = req.user, body = req.body;
                // Just update subscription if user has subscribed

                if (!req.subscription) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return new Promise(function (resolve) {
                  Subscription.editBySubscriber(user._id, {
                    endpoint: body.endpoint,
                    keys: JSON.stringify(body.keys)
                  }).then(function (item) {
                    resolve(item);
                  });
                });

              case 5:
                _data = _context.sent;

                (0, _helpers.notify)(_data, 'You will now receive push notifications on this device').then(function () {
                  res.status(200).json({
                    status: 200,
                    data: _data
                  });
                });
                return _context.abrupt('return');

              case 8:
                _context.next = 10;
                return new Promise(function (resolve) {
                  Subscription.create({
                    endpoint: body.endpoint,
                    keys: JSON.stringify(body.keys),
                    subscriber: user._id
                  }).then(function (subscription) {
                    resolve(subscription);
                  });
                });

              case 10:
                data = _context.sent;

                (0, _helpers.notify)(data, 'You have subscribed for push notifications').then(function () {
                  res.status(201).json({
                    status: 201,
                    data: data
                  });
                });
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context.t0
                });

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14]]);
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
    key: 'delete',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user, isDeleted;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = req.user;
                _context2.next = 4;
                return new Promise(function (resolve) {
                  Subscription.deleteBySubscriber(user._id).then(function (item) {
                    resolve(item);
                  });
                });

              case 4:
                isDeleted = _context2.sent;

                if (isDeleted) {
                  _context2.next = 8;
                  break;
                }

                res.status(500).json({
                  status: 500,
                  error: 'Could not unsubscribe'
                });
                return _context2.abrupt('return');

              case 8:
                res.status(200).json({
                  status: 200,
                  data: 'Successfully unsubscribed from push notifications'
                });
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context2.t0
                });

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function _delete(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return SubscriptionController;
}();

exports.default = SubscriptionController;