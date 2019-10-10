import db from '../db';
import {notify} from '../helpers';

const {
  models: {
    Like,
    Subscription
  }
} = db;

/**
 * @author Kingsley Victor
 */
export default class LikeController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const {user, file} = req;
      const like = await new Promise((resolve) => {
        Like.create({
          likedBy: user._id,
          file: file._id
        })
          .then((doc) => {
            resolve(doc);
          });
      });
      const subscription = await new Promise((resolve) => {
        Subscription.findBySubscriber(file.owner).then((item) => {
          resolve(item);
        });
      });
      if (subscription) {
        notify(subscription, `${user.username} liked your upload: ${file.caption}`).then((result) => {
          console.log(result);
        });
      }
      const data = {
        message: 'You liked this upload',
        like
      };
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
}

