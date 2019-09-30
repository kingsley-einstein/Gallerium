import {Router} from 'express';
import AuthRouter from './user';
import ProfileRouter from './profile';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Gallerium API'
  });
});

router.use('/', AuthRouter);
router.use('/', ProfileRouter);

export default router;
