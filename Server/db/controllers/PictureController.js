import {Picture} from '../models';

export class PictureController {
  async create(req, res) {
    try {
      const {url} = req.file;
      const {caption, remarks} = req.body;
      const {user_id, album_id} = req.query;
      const body = {
        url,
        caption,
        user_id,
        album_id,
        remarks
      };
      await Picture.create(body)
          .then((pic) => {
            res.status(201).json({
              status: 201,
              data: pic
            });
          })
          .catch((err) => {
            res.status(err.statusCode || 500).json({
              status: 500,
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

  async findAllByUser(req, res) {
    try {
      const {user_id} = req.query;
      await Picture.find({user_id}, {}, {}, (err, pics) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            message: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: pics
          });
        }
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: 500,
        message: err.message
      });
    }
  }

  async findByAlbum(req, res) {
    try {
      const {album_id} = req.query;
      await Picture.find({album_id}, (err, doc) => {
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

  async getOne(req, res) {
    try {
      const {id} = req.params;
      await Picture.findById(id, (err, doc) => {
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

  async update(req, res) {
    try {
      const {body, query} = req;
      const {id} = query;
      await Picture.findByIdAndUpdate(id, body, (err, doc) => {
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

  async delete(req, res) {
    try {
      const {id} = req.params;
      await Picture.findByIdAndDelete(id, (err, doc) => {
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
