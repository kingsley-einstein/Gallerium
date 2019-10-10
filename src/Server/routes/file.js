import {Router} from 'express';
import {Auth, parseFiles} from '../middlewares';
import {FileController} from '../controllers';
import multipart from '../multipart';

const router = Router();

router.post(
  '/upload',
  Auth.checkToken,
  multipart().array('picture'),
  parseFiles,
  FileController.create
);

router.get(
  '/upload',
  Auth.checkToken,
  FileController.getAllByUser
);

router.get(
  '/upload:user_id',
  Auth.checkToken,
  FileController.getAllByAnotherUser
);

router.get(
  '/upload/:file_id',
  Auth.checkToken,
  FileController.getFile
);

router.delete(
  '/upload',
  Auth.checkToken,
  FileController.delete
);

router.delete(
  '/upload/:file_id',
  Auth.checkToken,
  FileController.deleteOne
);

export default router;
