import db from '../db';
import {notify} from '../helpers';

const {
  models: {
    Subscription
  }
} = db;

/**
 * @author Kingsley Victor
 */
export default class SubscriptionController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const {user, body} = req;
      // Just update subscription if user has subscribed
      if (req.subscription) {
        const data = await new Promise((resolve) => {
          Subscription.editBySubscriber(user._id, {
            endpoint: body.endpoint,
            keys: JSON.stringify(body.keys)
          })
            .then((item) => {
              resolve(item);
            });
        });
        notify(data, 'You will now receive push notifications on this device').then(() => {
          res.status(200).json({
            status: 200,
            data
          });
        });
        return;
      }
      const data = await new Promise((resolve) => {
        Subscription.create({
          endpoint: body.endpoint,
          keys: JSON.stringify(body.keys),
          subscriber: user._id
        })
          .then((subscription) => {
            resolve(subscription);
          });
      });
      notify(data, 'You have subscribed for push notifications').then(() => {
        res.status(201).json({
          status: 201,
          data
        });
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
  static async delete(req, res) {
    try {
      const {user} = req;
      const isDeleted = await new Promise((resolve) => {
        Subscription.deleteBySubscriber(user._id).then((item) => {
          resolve(item);
        });
      });
      if (!isDeleted) {
        res.status(500).json({
          status: 500,
          error: 'Could not unsubscribe'
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: 'Successfully unsubscribed from push notifications'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}
