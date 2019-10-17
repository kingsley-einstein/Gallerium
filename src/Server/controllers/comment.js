import db from '../db';

const {
  models: {
    Comment
  }
} = db;

/**
 * @author Kingsley Victor
 */
export default class CommentController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const {user, params, body} = req;
      const data = await new Promise((resolve) => {
        Comment.create({
          madeBy: user.id,
          file: params.file_id,
          actual: body.message
        })
          .then((comment) => {
            resolve(comment);
          });
      });
      res.status(201).json({
        status: 201,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async update(req, res) {
    try {
      const data = await new Promise((resolve) => {
        Comment.findByIdAndUpdate(req.params.id, req.body).then((comment) => {
          resolve(comment);
        });
      });
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async delete(req, res) {
    try {
      const {params} = req;
      const data = await new Promise((resolve) => {
        Comment.findOneAndDelete({
          _id: params.id
        }).then((comment) => {
          resolve(comment);
        });
      });
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}
