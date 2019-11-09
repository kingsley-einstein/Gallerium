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

var _db$models = _db2.default.models,
    Like = _db$models.Like,
    Subscription = _db$models.Subscription,
    Notification = _db$models.Notification;

/**
 * @author Kingsley Victor
 */

var LikeController = function () {
  function LikeController() {
    _classCallCheck(this, LikeController);
  }

  _createClass(LikeController, null, [{
    key: 'create',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user, file, like, subscription, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                user = req.user, file = req.file;
                _context.next = 4;
                return new Promise(function (resolve) {
                  Like.create({
                    likedBy: user._id,
                    file: file._id
                  }).then(function (doc) {
                    resolve(doc);
                  });
                });

              case 4:
                like = _context.sent;

                Notification.create({
                  owner: file.owner,
                  message: user.username + ' liked your upload: ' + file.caption
                }).then(function (d) {
                  console.log('New notification created');
                });
                _context.next = 8;
                return new Promise(function (resolve) {
                  Subscription.findBySubscriber(file.owner).then(function (item) {
                    resolve(item);
                  });
                });

              case 8:
                subscription = _context.sent;

                if (subscription) {
                  (0, _helpers.notify)(subscription, user.username + ' liked your upload: ' + file.caption).then(function (result) {
                    console.log(result);
                  });
                }
                data = {
                  message: 'You liked this upload',
                  like: like
                };

                res.status(201).json({
                  status: 201,
                  data: data
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
    key: 'unlike',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user, params, isDeleted;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = req.user, params = req.params;
                _context2.next = 4;
                return new Promise(function (resolve) {
                  Like.deleteByLikedByAndFile(user._id, params.file_id).then(function (ok) {
                    resolve(ok);
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
                  error: 'Could not unlike'
                });
                return _context2.abrupt('return');

              case 8:
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context2.t0
                });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function unlike(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return unlike;
    }()
  }]);

  return LikeController;
}();

exports.default = LikeController;