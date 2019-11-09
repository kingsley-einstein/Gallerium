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

var FileItem = _db2.default.models.FileItem;

/**
 * @author Kingsley Victor
 */

var FileController = function () {
  function FileController() {
    _classCallCheck(this, FileController);
  }

  _createClass(FileController, null, [{
    key: 'create',

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var files, items, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                files = req.files;
                items = Array.from(files);
                _context.next = 5;
                return new Promise(function (resolve) {
                  FileItem.create(items).then(function (docs) {
                    resolve(docs);
                  });
                });

              case 5:
                data = _context.sent;

                res.status(201).json({
                  status: 201,
                  data: data
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context.t0
                });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
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
    key: 'getAllByUser',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = req.user;
                _context2.next = 4;
                return new Promise(function (resolve) {
                  FileItem.findAllByOwner(user._id).then(function (file) {
                    resolve(file);
                  });
                });

              case 4:
                data = _context2.sent;

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context2.t0
                });

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function getAllByUser(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getAllByUser;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'getAllByAnotherUser',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var user_id, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                user_id = req.params.user_id;
                _context3.next = 4;
                return new Promise(function (resolve) {
                  FileItem.findAllByOwner(user_id).then(function (files) {
                    resolve(files);
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

      function getAllByAnotherUser(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getAllByAnotherUser;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'delete',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var user, isDeleted;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                user = req.user;
                _context4.next = 4;
                return new Promise(function (resolve) {
                  FileItem.deleteByOwner(user._id).then(function (ok) {
                    resolve(ok);
                  });
                });

              case 4:
                isDeleted = _context4.sent;

                if (isDeleted) {
                  _context4.next = 8;
                  break;
                }

                res.status(500).json({
                  status: 400,
                  error: 'Deletion could not occur'
                });
                return _context4.abrupt('return');

              case 8:
                res.status(200).json({
                  status: 200,
                  data: 'Successfully deleted items'
                });
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context4.t0
                });

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function _delete(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return _delete;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'deleteOne',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var user, params, isDeleted;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                user = req.user, params = req.params;
                _context5.next = 4;
                return new Promise(function (resolve) {
                  FileItem.deleteByOwnerAndId(user._id, params.file_id).then(function (ok) {
                    resolve(ok);
                  });
                });

              case 4:
                isDeleted = _context5.sent;

                if (isDeleted) {
                  _context5.next = 8;
                  break;
                }

                res.status(500).json({
                  status: 500,
                  error: 'Could not perform deletion'
                });
                return _context5.abrupt('return');

              case 8:
                res.status(200).json({
                  status: 200,
                  data: 'Successfully deleted item'
                });
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context5.t0
                });

              case 14:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 11]]);
      }));

      function deleteOne(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return deleteOne;
    }()

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */

  }, {
    key: 'getFile',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var file_id, data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                file_id = req.params.file_id;
                _context6.next = 4;
                return new Promise(function (resolve) {
                  FileItem.findById(file_id).then(function (file) {
                    resolve(file);
                  });
                });

              case 4:
                data = _context6.sent;

                res.status(200).json({
                  status: 200,
                  data: data
                });
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6['catch'](0);

                res.status(500).json({
                  status: 500,
                  error: _context6.t0
                });

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 8]]);
      }));

      function getFile(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return getFile;
    }()
  }]);

  return FileController;
}();

exports.default = FileController;