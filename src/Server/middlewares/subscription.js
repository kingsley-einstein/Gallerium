import db from '../db';

const {
  models: {
    Subscription
  }
} = db;

/**
 * @author Kingsley Victor
 */
export class Subscriptions {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static async checkIfSubscribed(req, res, next) {
    const {user} = req;
    const subscription = await new Promise((resolve) => {
      Subscription.findBySubscriber(user._id).then((item) => {
        resolve(item);
      });
    });
    if (subscription) {
      // If a subscription exists, pass it to the request
      req.subscription = subscription;
    }
    next();
  }
}
