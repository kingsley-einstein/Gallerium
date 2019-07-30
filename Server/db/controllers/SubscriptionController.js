import {Subscription} from '../models';
import {webpush} from '../../push';

export class SubscriptionController {
  async subscribe(req, res) {
    try {
      const {body} = req;
      const subscription = await new Promise((resolve, reject) => {
        Subscription.findOne(
            {
              user_id: body.user_id
            },
            (err, sub) => {
              if (err) reject(err);
              resolve(sub);
            }
        );
      });
      if (subscription) {
        Subscription.findByIdAndDelete(subscription._id, (err, data) => {
          if (err) {
            res.status(err.statusCode || 500).json({
              status: err.statusCode || 500,
              error: err.message
            });
            return;
          }
          // res.status(200).json({
          //   status: 200,
          //   data
          // });
        });
      }
      await Subscription.create(body)
          .then((data) => {
            webpush.sendNotification(
                {
                  keys: {
                    auth: data.auth,
                    p256dh: data.p256dh
                  },
                  endpoint: data.endpoint
                },
                JSON.stringify({
                  title: 'Subscribed to push notifications',
                  message: `You'll now receive push notifications`
                })
            );
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

  async unsubscribe(req, res) {
    try {
      const {endpoint} = req.params;
      await Subscription.findOneAndDelete({endpoint}, (err, data) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
          return;
        }
        if (data) {
          res.status(200).json({
            status: 200,
            data: 'Successfully unsubscribed from receiving push notifications'
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
