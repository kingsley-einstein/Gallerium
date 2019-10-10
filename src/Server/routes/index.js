import {Router} from 'express';
import AuthRouter from './user';
import ProfileRouter from './profile';
import FileRouter from './file';
import LikeRouter from './like';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Gallerium API'
  });
});

router.use('/', AuthRouter);
router.use('/', ProfileRouter);
router.use('/', FileRouter);
router.use('/', LikeRouter);

export default router;
