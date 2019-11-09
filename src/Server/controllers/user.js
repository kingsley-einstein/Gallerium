import {Encryptions} from '../helpers';
import db from '../db';

const {models: {
  User,
  Blacklist
}} = db;

/**
 * @author Kingsley Victor
 */
export default class UserController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const {body} = req;
      const data = await new Promise((resolve) => {
        User.create(body).then((user) => {
          const {_id, username, password, phone_number} = user;
          const jwt_payload = {
            id: _id,
            password
          };
          const sent = {
            id: _id,
            username,
            phone_number,
            token: Encryptions.tokenize(jwt_payload)
          };
          resolve(sent);
        });
      });
      res.status(201).json({
        status: 201,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async loginWithUsername(req, res) {
    try {
      const {username, password} = req.body;
      const user = await new Promise((resolve) => {
        User.findByUsername(username).then((item) => {
          resolve(item);
        });
      });
      if (!user) {
        res.status(404).json({
          status: 404,
          error: 'User not found'
        });
        return;
      }
      if (!Encryptions.compare(password, user.password)) {
        res.status(400).json({
          status: 400,
          error: 'Incorrect password'
        });
        return;
      }
      const {_id, phone_number} = user;
      const jwt_payload = {
        id: _id,
        password: user.password
      };
      const data = {
        id: _id,
        username,
        phone_number,
        token: Encryptions.tokenize(jwt_payload)
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async loginWithPhoneNumber(req, res) {
    try {
      const {phone_number, password} = req.body;
      const user = await new Promise((resolve) => {
        User.findByPhoneNumber(phone_number).then((item) => {
          resolve(item);
        });
      });
      if (!user) {
        res.status(404).json({
          status: 404,
          error: 'User not found'
        });
        return;
      }
      if (!Encryptions.compare(password, user.password)) {
        res.status(400).json({
          status: 400,
          error: 'Incorrect password'
        });
        return;
      }
      const {_id, username} = user;
      const jwt_payload = {
        id: _id,
        password: user.password
      };
      const data = {
        id: _id,
        username,
        phone_number,
        token: Encryptions.tokenize(jwt_payload)
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async update(req, res) {
    try {
      const {user, body} = req;
      const item = await new Promise((resolve) => {
        User.findById(user._id).then((value) => {
          Object.keys(body).forEach((key) => {
            value[key] = body[key];
          });
          value.save();
          resolve(value);
        });
      });
      const {_id, phone_number, username} = item;
      const data = {
        id: _id,
        phone_number,
        username
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async logout(req, res) {
    try {
      const {user, token} = req;
      const blacklist = await new Promise((resolve) => {
        Blacklist.create({token}).then((item) => {
          resolve(item);
        });
      });
      const data = {
        message: `Successfully signed out user ${user.username}`,
        blacklist
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async getLoggedUser(req, res) {
    try {
      const {user} = req;
      const data = {
        id: user._id,
        username: user.username
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async getAllUsers(req, res) {
    try {
      const data = await new Promise((resolve) => {
        User.find().then((docs) => {
          resolve(docs);
        });
      });
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}
