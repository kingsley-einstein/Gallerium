import {Router} from 'express';
import {Auth, Likes} from '../middlewares';
import {LikeController} from '../controllers';

const router = Router();

router.post(
  '/like/:file_id',
  Auth.checkToken,
  Likes.checkIfPreviouslyLiked,
  LikeController.create
);

router.delete(
  '/unlike/:file_id',
  Auth.checkToken,
  Likes.canUnlike,
  LikeController.unlike
);

export default router;
