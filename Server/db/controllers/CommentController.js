import {Comment} from '../models';

export class CommentController {
  async create(req, res) {
    try {
      const {body} = req;
      await Comment.create(body)
          .then((comment) => {
            res.status(201).json({
              status: 201,
              data: comment
            });
          })
          .catch((err) => {
            res.status(err.statusCode || 500).json({
              status: err.statusCode || 500,
              error: err.message
            });
          });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async findCommentsOnPicture(req, res) {
    try {
      const {picture_id} = req.query;
      await Comment.find({picture_id}, (err, doc) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: doc
          });
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async findCommentsOnVideo(req, res) {
    try {
      const {video_id} = req.query;
      await Comment.find({video_id}, (err, doc) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: doc
          });
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async editComment(req, res) {
    try {
      const {body, params} = req;
      const {id} = params;
      await Comment.findByIdAndUpdate(id, body, (err, doc) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: doc
          });
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const {id} = req.params;
      await Comment.findByIdAndDelete(id, (err, doc) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: doc
          });
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }
}
