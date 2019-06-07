import {Router} from 'express';
import {UserController} from './db/controllers';

const router = Router();
const userController = new UserController();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Gallerium API'
  });
});

// User specific routes
router.post('/auth/register', userController.create);

export default router;
