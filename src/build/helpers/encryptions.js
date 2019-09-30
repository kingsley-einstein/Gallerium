'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Encryptions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Kingsley Victor
 */
var Encryptions = exports.Encryptions = function () {
  function Encryptions() {
    _classCallCheck(this, Encryptions);
  }

  _createClass(Encryptions, null, [{
    key: 'compare',

    /**
     *
     * @param {string} str
     * @param {string} hash
     * @return {boolean}
     */
    value: function compare(str, hash) {
      return _bcryptjs2.default.compareSync(str, hash);
    }

    /**
     *
     * @param {*} payload
     * @return {string}
     */

  }, {
    key: 'tokenize',
    value: function tokenize(payload) {
      return _jsonwebtoken2.default.sign(payload, _env2.default.jwt_secret, {
        expiresIn: 72 * 60 * 60
      });
    }
  }]);

  return Encryptions;
}();