import {Router} from 'express';
import {Passport} from './auth';
import {parser} from './uploads';
import {
  UserController,
  PictureController,
  VideoController
} from './db/controllers';

const router = Router();
const {authenticate} = new Passport();
const {single} = parser;
const userController = new UserController();
const pictureController = new PictureController();
const videoController = new VideoController();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Gallerium API'
  });
});

// User specific routes
router.post('/auth/register', userController.create);
router.post('/auth/login', userController.login);
router.get('/users/:id', authenticate('jwt'), userController.findUserById);
router.get(
    '/users/search',
    authenticate('jwt'),
    userController.findUsersMatching
);

// Picture specific routes
router.post(
    '/picture',
    authenticate('jwt'),
    single('picture'),
    pictureController.create
);
router.get('/pictures', authenticate('jwt'), pictureController.findAllByUser);

// Video specific routes
router.post(
    '/video',
    authenticate('jwt'),
    single('video'),
    videoController.create
);

export default router;
