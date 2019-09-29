import jwt from 'jsonwebtoken';
import {Keys} from '../helpers';
import env from '../env';
import db from '../db';

const {models: {
  Blacklist,
  User
}} = db;

/**
 * @author Kingsley Victor
 */
export class Auth {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static async checkToken(req, res, next) {
    const {authorization} = req.headers;
    if (!authorization) {
      res.status(400).json({
        status: 400,
        error: 'Auth header not present in request'
      });
      return;
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'Token not found in auth header'
      });
      return;
    }
    const validToken = await new Promise((resolve) => {
      jwt.verify(token, env.jwt_secret, null, (err, decoded) => {
        resolve(decoded);
      });
    });
    if (!validToken) {
      res.status(401).json({
        status: 401,
        error: 'Token is invalid'
      });
      return;
    }
    const blacklisted = await new Promise((resolve) => {
      Blacklist.findByToken(token).then((item) => {
        resolve(item);
      });
    });
    if (blacklisted) {
      res.status(401).json({
        status: 401,
        error: 'User must be logged in to access this resource'
      });
      return;
    }
    const decoded = jwt.decode(token);
    const user = await new Promise((resolve) => {
      User.findById(decoded.id).then((item) => {
        resolve(item);
      });
    });
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).json({
        status: 401,
        error: 'Unable to authenticate'
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static checkBody(req, res, next) {
    const {body} = req;
    const requiredKeys = ['username', 'password', 'phone_number'];
    if (!Keys.contains(body, requiredKeys)) {
      res.status(400).json({
        status: 400,
        error: `Missing required keys ${Keys.missing(body, requiredKeys)}`
      });
      return;
    }
    const keysMatchTypes = Keys.keysAreOfTypes(body, {
      username: 'string',
      password: 'string',
      phone_number: 'string'
    });
    if (!keysMatchTypes) {
      res.status(400).json({
        status: 400,
        error: 'Certain body params are invalid'
      });
      return;
    }
    next();
  }
}
