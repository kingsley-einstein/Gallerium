'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _helpers = require('../helpers');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = _config2.default.chai,
    expect = _config2.default.expect;
var _db$models = _db2.default.models,
    User = _db$models.User,
    Profile = _db$models.Profile;


var root = '/api/v1';

var token = null;

describe('PROFILE tests', function () {
  before(function (done) {
    User.create({
      username: 'jameson',
      password: 'password',
      phone_number: '09090324678'
    }).then(function (user) {
      var payload = {
        id: user._id,
        password: user.password
      };
      token = _helpers.Encryptions.tokenize(payload);
      done();
    });
  });
  describe('POST', function () {
    it('should create user profile', function (done) {
      chai.request(_2.default).post(root + '/profile').set('Authorization', 'Bearer ' + token).send({
        first_name: 'James',
        last_name: 'Nick',
        dob: '10/30/1998'
      }).end(function (err, res) {
        var status = res.status;

        expect(status).to.be.eql(201);
        done();
      });
    });
  });
  describe('PUT', function () {
    it('should update user profile', function (done) {
      chai.request(_2.default).put(root + '/profile').set('Authorization', 'Bearer ' + token).send({
        first_name: 'Jake'
      }).end(function (err, res) {
        var status = res.status;

        expect(status).to.be.eql(200);
        done();
      });
    });
  });
  after(function (done) {
    Profile.deleteMany().then(function () {
      done();
    });
  });
});