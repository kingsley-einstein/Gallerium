import config from './config';
import app from '..';
import db from '../db';

const {chai, expect} = config;
const {models: {
  User
}} = db;

const root = '/api/v1';

let token = null;

describe('USER tests', () => {
  describe('POST', () => {
    it('should create a user', (done) => {
      chai.request(app)
        .post(`${root}/auth/register`)
        .send({
          username: 'jake',
          password: 'password',
          phone_number: '9145566780'
        })
        .end((err, res) => {
          const {body, status} = res;
          const {data} = body;
          token = data.token;
          expect(status).to.be.eql(201);
          done();
        });
    });
    it('should log a user in using their username', (done) => {
      chai.request(app)
        .post(`${root}/auth/login/username`)
        .send({
          username: 'jake',
          password: 'password'
        })
        .end((err, res) => {
          const {body, status} = res;
          const {data} = body;
          token = data.token;
          expect(status).to.be.eql(200);
          done();
        });
    });
    it('should log a user out', (done) => {
      chai.request(app)
        .post(`${root}/auth/logout`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const {body, status} = res;
          const {data} = body;
          const {message} = data;
          expect(message).to.be.a('string');
          expect(status).to.be.eql(200);
          done();
        });
    });
  });
  describe('PUT', () => {
    before((done) => {
      chai.request(app)
        .post(`${root}/auth/login/username`)
        .send({
          username: 'jake',
          password: 'password'
        })
        .end((err, res) => {
          const {body: {
            data
          }} = res;
          token = data.token;
          done();
        });
    });
    it('should update a user', (done) => {
      chai.request(app)
        .put(`${root}/auth/update`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'password'
        })
        .end((err, res) => {
          const {status} = res;
          expect(status).to.be.eql(200);
          done();
        });
    });
  });
  after((done) => {
    User.deleteOne({
      username: 'jake'
    })
      .then(() => {
        done();
      });
  });
});
