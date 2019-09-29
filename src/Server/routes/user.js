import {Router} from 'express';
import {Auth} from '../middlewares';
import {UserController} from '../controllers';

const router = Router();

router.post(
  '/auth/register',
  Auth.checkBody,
  UserController.create
);

router.post(
  '/auth/login/username',
  UserController.loginWithUsername
);

router.post(
  '/auth/login/phone',
  UserController.loginWithPhoneNumber
);

router.put(
  '/auth/update',
  Auth.checkToken,
  UserController.update
);

export default router;
