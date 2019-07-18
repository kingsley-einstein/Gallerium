import {User} from '../models';
import {Comparators, Notifs} from '../../helpers';

const comparators = new Comparators();
const notifs = new Notifs();

export class UserController {
  async create(req, res) {
    try {
      const requiredKeys = ['username', 'password'];
      const {body} = req;
      if (comparators.hasKeys(body, requiredKeys)) {
        await User.create(body)
            .then((user) => {
              res.status(201).json({
                status: 201,
                data: user
              });
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                error: err.message
              });
            });
      } else {
        notifs.showMissingKeys(res, body, requiredKeys);
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      await User.findOne({username}, (err, doc) => {
        // console.log(username);
        // console.log(doc);
        if (!doc) {
          res.status(404).json({
            status: 404,
            error: 'User not found'
          });
        } else {
          if (comparators.comparePassword(password, doc.password)) {
            res.status(200).json({
              status: 200,
              data: doc
            });
          } else {
            res.status(401).json({
              status: 401,
              error: 'Incorrect password'
            });
          }
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async findUserById(req, res) {
    try {
      const {id} = req.params;
      await User.findById(id, (err, doc) => {
        if (err) throw err;
        res.status(200).json({
          status: 200,
          data: doc
        });
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async findUsersMatching(req, res) {
    try {
      const {search} = req.query;
      await User.find({username: {$regex: search, $options: 'i'}}).exec(
          (err, docs) => {
            if (err) {
              res.status(500).json({
                status: 500,
                error: err.message
              });
            } else {
              res.status(200).json({
                status: 200,
                data: docs
              });
            }
          });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async update(req, res) {
    try {
      const {body, params} = req;
      const {id} = params;
      await User.findByIdAndUpdate(id, body, (err, user) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: user
          });
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }
}
