import db from '../db';

const {
  models: {
    Like,
    FileItem
  }
} = db;

/**
 * @author Kingsley Victor
 */
export class Likes {
  /**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
static async checkIfPreviouslyLiked(req, res, next) {
  const {user, params} = req;
  const liked = await new Promise((resolve) => {
    Like.findByLikedByAndFile(user._id, params.file_id).then((like) => {
      resolve(like);
    });
  });
  if (liked) {
    res.status(400).json({
      status: 400,
      error: 'You have previously liked this upload.'
    });
    return;
  }
  const file = await new Promise((resolve) => {
    FileItem.findById(params.file_id).then((item) => {
      resolve(item);
    });
  });
  req.file = file;
  next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
static async canUnlike(req, res, next) {
  const {user, params} = req;
  const liked = await new Promise((resolve) => {
    Like.findByLikedByAndFile(user._id, params.file_id).then((like) => {
      resolve(like);
    });
  });
  if (!liked) {
    res.status(400).json({
      status: 'You have not previously liked this upload.'
    });
    return;
  }
  next();
};
}
