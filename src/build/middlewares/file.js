'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFiles = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
var parseFiles = exports.parseFiles = function parseFiles(req, res, next) {
  var user = req.user,
      files = req.files,
      _req$body = req.body,
      caption = _req$body.caption,
      description = _req$body.description;

  var parsedFiles = [];
  if (!files || files.length === 0) {
    res.status(400).json({
      status: 400,
      error: 'No files present in request'
    });
    return;
  }
  Array.from(files).forEach(function (file) {
    var parsedFile = {
      caption: caption,
      description: description,
      mimeType: file.mimetype,
      bytes: Buffer.from(_fs2.default.readFileSync(file.path)).toString('base64'),
      owner: user._id
    };
    parsedFiles.push(parsedFile);
    _fs2.default.unlinkSync(file.path);
  });
  req.files = parsedFiles;
  next();
};