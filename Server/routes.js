import {Router} from 'express';
import {Passport} from './auth';
import {parser} from './uploads';
import {UserController, PictureController} from './db/controllers';

const router = Router();
const {authenticate} = new Passport();
const {single} = parser;
const userController = new UserController();
const pictureController = new PictureController();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Gallerium API'
  });
});

// User specific routes
router.post('/auth/register', userController.create);
router.post('/auth/login', userController.login);
router.post('/users/:id', authenticate('jwt'), userController.findUserById);

// Picture specific routes
router.post('/picture',
    authenticate('jwt'),
    single('picture'),
    pictureController.create);

export default router;
