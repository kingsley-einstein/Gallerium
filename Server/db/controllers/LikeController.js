import {Like, User, Subscription} from '../models';
import {webpush} from '../../push';

export class LikeController {
  async like(req, res) {
    try {
      const {body, params} = req;
      const {user_id} = params;
      const liked_by = await new Promise((resolve, reject) => {
        User.findById(body.liked_by, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
      const subscription = await new Promise((resolve, reject) => {
        Subscription.findOne({user_id}, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
      Like.create(body)
          .then((data) => {
            if (subscription) {
              const {endpoint, auth, p256dh} = subscription;
              const keys = {
                auth,
                p256dh
              };
              const opts = {
                keys,
                endpoint
              };
              webpush.sendNotification(
                  opts,
                  JSON.stringify({
                    title: 'Someone liked your upload',
                    message: `${liked_by.username} liked your upload`
                  })
              );
            }
            res.status(201).json({
              status: 201,
              data
            });
          })
          .catch((err) => {
            res.status(err.statusCode || 500).json({
              status: err.statusCode || 500,
              error: err.message
            });
          });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }
}
