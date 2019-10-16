import db from '../db';
import {notify} from '../helpers';

const {
  models: {
    Like,
    Subscription,
    Notification
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
      Notification.create({
        owner: file.owner,
        message: `${user.username} liked your upload: ${file.caption}`
      })
        .then((d) => {
          console.log('New notification created');
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

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async unlike(req, res) {
    try {
      const {user, params} = req;
      const isDeleted = await new Promise((resolve) => {
        Like.deleteByLikedByAndFile(user._id, params.file_id).then((ok) => {
          resolve(ok);
        });
      });
      if (!isDeleted) {
        res.status(500).json({
          status: 500,
          error: 'Could not unlike'
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}

