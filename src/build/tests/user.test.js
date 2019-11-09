'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = _config2.default.chai,
    expect = _config2.default.expect;
var User = _db2.default.models.User;


var root = '/api/v1';

var token = null;

describe('USER tests', function () {
  describe('POST', function () {
    it('should create a user', function (done) {
      chai.request(_2.default).post(root + '/auth/register').send({
        username: 'jake',
        password: 'password',
        phone_number: '9145566780'
      }).end(function (err, res) {
        var body = res.body,
            status = res.status;
        var data = body.data;

        token = data.token;
        expect(status).to.be.eql(201);
        done();
      });
    });
    it('should log a user in using their username', function (done) {
      chai.request(_2.default).post(root + '/auth/login/username').send({
        username: 'jake',
        password: 'password'
      }).end(function (err, res) {
        var body = res.body,
            status = res.status;
        var data = body.data;

        token = data.token;
        expect(status).to.be.eql(200);
        done();
      });
    });
    it('should log a user out', function (done) {
      chai.request(_2.default).post(root + '/auth/logout').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        var body = res.body,
            status = res.status;
        var data = body.data;
        var message = data.message;

        expect(message).to.be.a('string');
        expect(status).to.be.eql(200);
        done();
      });
    });
  });
  describe('PUT', function () {
    before(function (done) {
      chai.request(_2.default).post(root + '/auth/login/username').send({
        username: 'jake',
        password: 'password'
      }).end(function (err, res) {
        var data = res.body.data;

        token = data.token;
        done();
      });
    });
    it('should update a user', function (done) {
      chai.request(_2.default).put(root + '/auth/update').set('Authorization', 'Bearer ' + token).send({
        password: 'password'
      }).end(function (err, res) {
        var status = res.status;

        expect(status).to.be.eql(200);
        done();
      });
    });
  });
  after(function (done) {
    User.deleteMany().then(function () {
      done();
    });
  });
});