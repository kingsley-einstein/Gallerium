'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriptions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = _db2.default.models.Subscription;

/**
 * @author Kingsley Victor
 */

var Subscriptions = exports.Subscriptions = function () {
  function Subscriptions() {
    _classCallCheck(this, Subscriptions);
  }

  _createClass(Subscriptions, null, [{
    key: 'checkIfSubscribed',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var user, subscription;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user;
                _context.next = 3;
                return new Promise(function (resolve) {
                  Subscription.findBySubscriber(user._id).then(function (item) {
                    resolve(item);
                  });
                });

              case 3:
                subscription = _context.sent;

                if (subscription) {
                  // If a subscription exists, pass it to the request
                  req.subscription = subscription;
                }
                next();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkIfSubscribed(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return checkIfSubscribed;
    }()
  }]);

  return Subscriptions;
}();