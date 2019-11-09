'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Likes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _db$models = _db2.default.models,
    Like = _db$models.Like,
    FileItem = _db$models.FileItem;

/**
 * @author Kingsley Victor
 */

var Likes = exports.Likes = function () {
  function Likes() {
    _classCallCheck(this, Likes);
  }

  _createClass(Likes, null, [{
    key: 'checkIfPreviouslyLiked',

    /**
    *
    * @param {Request} req
    * @param {Response} res
    * @param {*} next
    */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var user, params, liked, file;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user, params = req.params;
                _context.next = 3;
                return new Promise(function (resolve) {
                  Like.findByLikedByAndFile(user._id, params.file_id).then(function (like) {
                    resolve(like);
                  });
                });

              case 3:
                liked = _context.sent;

                if (!liked) {
                  _context.next = 7;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: 'You have previously liked this upload.'
                });
                return _context.abrupt('return');

              case 7:
                _context.next = 9;
                return new Promise(function (resolve) {
                  FileItem.findById(params.file_id).then(function (item) {
                    resolve(item);
                  });
                });

              case 9:
                file = _context.sent;

                req.file = file;
                next();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkIfPreviouslyLiked(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return checkIfPreviouslyLiked;
    }()
  }, {
    key: 'canUnlike',


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     */
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var user, params, liked;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = req.user, params = req.params;
                _context2.next = 3;
                return new Promise(function (resolve) {
                  Like.findByLikedByAndFile(user._id, params.file_id).then(function (like) {
                    resolve(like);
                  });
                });

              case 3:
                liked = _context2.sent;

                if (liked) {
                  _context2.next = 7;
                  break;
                }

                res.status(400).json({
                  status: 'You have not previously liked this upload.'
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

      function canUnlike(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return canUnlike;
    }()
  }]);

  return Likes;
}();