import config from './config';
import {Encryptions} from '../helpers';
import app from '..';
import db from '../db';

const {chai, expect} = config;

const {models: {
  User,
  Profile
}} = db;

const root = '/api/v1';

let token = null;

describe('PROFILE tests', () => {
  before((done) => {
    User.create({
      username: 'jameson',
      password: 'password',
      phone_number: '09090324678'
    })
      .then((user) => {
        const payload = {
          id: user._id,
          password: user.password
        };
        token = Encryptions.tokenize(payload);
        done();
      });
  });
  describe('POST', () => {
    it('should create user profile', (done) => {
      chai.request(app)
        .post(`${root}/profile`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          first_name: 'James',
          last_name: 'Nick',
          dob: '10/30/1998'
        })
        .end((err, res) => {
          const {status} = res;
          expect(status).to.be.eql(201);
          done();
        });
    });
  });
  describe('PUT', () => {
    it('should update user profile', (done) => {
      chai.request(app)
        .put(`${root}/profile`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          first_name: 'Jake'
        })
        .end((err, res) => {
          const {status} = res;
          expect(status).to.be.eql(200);
          done();
        });
    });
  });
  after((done) => {
    Profile.deleteMany().then(() => {
      done();
    });
  });
});
