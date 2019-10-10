import path from 'path';
import multer from 'multer';

export default () => multer({
  dest: path.join(__dirname, '/uploads')
});
