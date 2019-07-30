import {Subscription} from '../models';

export class SubscriptionController {
  async subscribe(req, res) {
    try {
      const {body} = req;
      await Subscription.create(body).then((data) => {
        res.status(201).json({
          status: 201,
          data
        });
      }).catch((err) => {
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
