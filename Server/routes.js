import {Router} from 'express';
import {Passport} from './auth';
import {parser} from './uploads';
import {
  UserController,
  // PictureController,
  // VideoController,
  // AlbumController,
  UploadController,
  SubscriptionController,
  LikeController,
  FollowController
} from './db/controllers';

const router = Router();
const {authenticate} = new Passport();
// const {single} = parser;
const userController = new UserController();
// const pictureController = new PictureController();
// const videoController = new VideoController();
// const albumController = new AlbumController();
const uploadController = new UploadController();
const subscriptionController = new SubscriptionController();
const likeController = new LikeController();
const followController = new FollowController();

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
    '/users/search/:search',
    authenticate('jwt'),
    userController.findUsersMatching
);
router.put('/users/:id', authenticate('jwt'), userController.update);

// // Picture specific routes
// router.post(
//     '/picture',
//     authenticate('jwt'),
//     parser.single('picture'),
//     pictureController.create
// );
// router.get('/pictures',
// authenticate('jwt'),
// pictureController.findAllByUser);

// // Video specific routes
// router.post(
//     '/video',
//     authenticate('jwt'),
//     parser.single('video'),
//     videoController.create
// );

// Album specific routes
// router.post('/album', authenticate('jwt'), albumController.create);
// router.get('/album/user', authenticate('jwt'),
// albumController.getAlbumsByUser);
// router.put('/album/:album_id', authenticate('jwt'), albumController.update);
// router.delete('/album/:album_id', authenticate('jwt'),
// albumController.delete);

// Upload specific routes
// router.post('/upload',
//     authenticate('jwt'),
//     parser.single('file'),
//     uploadController.create);
router.post(
    '/upload',
    authenticate('jwt'),
    parser.array('file'),
    uploadController.createMultiple
);
router.get('/uploads/byuser', authenticate('jwt'), uploadController.findByUser);
router.get(
    '/uploads/byid/:file_id',
    authenticate('jwt'),
    uploadController.getOne
);
router.get(
    '/uploads/:user_id/limit',
    authenticate('jwt'),
    uploadController.findAndLimit
);

// Push subscription routes
router.post(
    '/push/subscribe',
    authenticate('jwt'),
    subscriptionController.subscribe
);
router.delete(
    '/push/unsubscribe/:user_id',
    authenticate('jwt'),
    subscriptionController.unsubscribe
);

// Like specific routes
router.post('/like/:user_id', authenticate('jwt'), likeController.like);
router.delete('/unlike', authenticate('jwt'), likeController.unlike);
router.get(
    '/likes/count/:upload_id',
    authenticate('jwt'),
    likeController.countLikes
);

// Follow routes
router.post('/follow', authenticate('jwt'), followController.follow);
router.put(
    '/unfollow/:user_id/:follow_id',
    authenticate('jwt'),
    followController.unfollow
);

export default router;
