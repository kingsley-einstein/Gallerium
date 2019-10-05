import {Router} from 'express';
import {Auth} from '../middlewares';
import {ProfileController} from '../controllers';

const router = Router();

router.post(
  '/profile',
  Auth.checkToken,
  ProfileController.create
);

router.put(
  '/profile',
  Auth.checkToken,
  ProfileController.update
);

router.get(
  '/profile',
  Auth.checkToken,
  ProfileController.getUserProfile
);

router.get(
  '/profile/:user_id',
  Auth.checkToken,
  ProfileController.getAnotherUserProfile
);

export default router;
