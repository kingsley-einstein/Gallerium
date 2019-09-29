'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Kingsley Victor
 */
var Keys = exports.Keys = function () {
  function Keys() {
    _classCallCheck(this, Keys);
  }

  _createClass(Keys, null, [{
    key: 'contains',

    /**
     *
     * @param {*} body
     * @param {string[]} keys
     * @return {boolean}
     */
    value: function contains(body, keys) {
      return keys.every(function (value) {
        return Object.keys(body).some(function (key) {
          return key === value;
        });
      });
    }

    /**
     *
     * @param {string} key
     * @param {string} type
     * @return {boolean}
     */

  }, {
    key: 'isOfType',
    value: function isOfType(key, type) {
      return (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === type;
    }

    /**
     *
     * @param {*} body
     * @param {string[]} keys
     * @return {string[]}
     */

  }, {
    key: 'missing',
    value: function missing(body, keys) {
      var missing = [];
      Object.keys(body).forEach(function (value) {
        var isPresent = keys.some(function (key) {
          return key === value;
        });
        if (!isPresent) {
          missing.push(value);
        }
      });
      return missing;
    }

    /**
     *
     * @param {*} body
     * @param {string[]} nonNullableKeys
     * @return {boolean}
     */

  }, {
    key: 'isNotNull',
    value: function isNotNull(body, nonNullableKeys) {
      return nonNullableKeys.every(function (key) {
        return body[key] !== null || typeof body[key] !== 'undefined';
      });
    }

    /**
     *
     * @param {*} body
     * @param {*} config
     * @return {boolean}
     */

  }, {
    key: 'keysAreOfTypes',
    value: function keysAreOfTypes(body, config) {
      return Object.keys(config).every(function (key) {
        return _typeof(body[key]) === config[key];
      });
    }
  }]);

  return Keys;
}();