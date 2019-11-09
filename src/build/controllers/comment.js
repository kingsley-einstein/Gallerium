'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comment = _db2.default.models.Comment;

/**
 * @author Kingsley Victor
 */

var CommentController = function () {
  function CommentController() {
    _classCallCheck(this, CommentController);
  }

  _createClass(CommentController, null, [{
    key: 'create',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user, params, body, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                user = req.user, params = req.params, body = req.body;
                _context.next = 4;
                return new Promise(function (resolve) {
                  Comment.create({
                    madeBy: user.id,
                    file: params.file_id,
                    actual: body.message
                  }).then(function (comment) {
                    resolve(comment);
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
    key: 'update',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return new Promise(function (resolve) {
                  Comment.findByIdAndUpdate(req.params.id, req.body).then(function (comment) {
                    resolve(comment);
                  });
                });

              case 3:
                data = _context2.sent;

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context2.t0
                });

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function update(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'delete',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                params = req.params;
                _context3.next = 4;
                return new Promise(function (resolve) {
                  Comment.findOneAndDelete({
                    _id: params.id
                  }).then(function (comment) {
                    resolve(comment);
                  });
                });

              case 4:
                data = _context3.sent;

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context3.t0
                });

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function _delete(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return CommentController;
}();

exports.default = CommentController;