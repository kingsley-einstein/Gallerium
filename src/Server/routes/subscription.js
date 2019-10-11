import {Router} from 'express';
import {Subscriptions, Auth} from '../middlewares';
import {SubscriptionController} from '../controllers';

const router = Router();

router.post(
  '/subscribe',
  Auth.checkToken,
  Subscriptions.checkIfSubscribed,
  SubscriptionController.create
);

router.delete(
  '/unsubscribe',
  Auth.checkToken,
  SubscriptionController.delete
);

export default router;
