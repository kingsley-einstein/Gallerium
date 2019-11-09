import {Router} from 'express';
import {Auth} from '../middlewares';
import {UserController} from '../controllers';

const router = Router();

router.post(
  '/auth/register',
  Auth.checkBody,
  Auth.checkIfExists,
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

router.post(
  '/auth/logout',
  Auth.checkToken,
  UserController.logout
);

router.get(
  '/auth/authenticated_user',
  Auth.checkToken,
  UserController.getLoggedUser
);

router.get(
  '/auth/getAll',
  Auth.checkToken,
  UserController.getAllUsers
);

export default router;
