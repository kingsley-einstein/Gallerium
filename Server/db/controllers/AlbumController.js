import {Album} from '../models';

export class AlbumController {
  async create(req, res) {
    try {
      const {query} = req;
      await Album.create(query).then((created) => {
        res.status(201).json({
          status: 201,
          data: created
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

  async getAlbumsByUser(req, res) {
    try {
      const {user_id} = req.query;
      await Album.find({user_id}, (err, docs) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: docs
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
      const {body, params} = req;
      const {album_id} = params;
      await Album.findByIdAndUpdate(album_id, body, (err, doc) => {
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
      const {album_id} = req.params;
      await Album.findByIdAndDelete(album_id, (err, doc) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            data: doc
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
