import {Upload} from '../models';

export class UploadController {
  // async create(req, res) {
  //   try {
  //     const {body, file, query} = req;
  //     body.url = file.url;
  //     body.user_id = query.user_id;
  //     body.album_id = query.album_id;
  //     await Upload.create(body).then((upload) => {
  //       res.status(201).json({
  //         status: 201,
  //         data: upload
  //       });
  //     }).catch((err) => {
  //       res.status(err.statusCode || 500).json({
  //         status: err.statusCode || 500,
  //         error: err.message
  //       });
  //     });
  //   } catch (err) {
  //     res.status(err.statusCode || 500).json({
  //       status: err.statusCode || 500,
  //       error: err.message
  //     });
  //   }
  // }

  async createMultiple(req, res) {
    try {
      const {body, files, query} = req;
      const {caption, remarks} = body;
      const {user_id, album_id} = query;
      const fileArr = [];
      Array.from(files).forEach((file) => {
        const {url} = file;
        fileArr.push({
          user_id,
          album_id,
          caption,
          remarks,
          url
        });
      });
      await Upload.create(fileArr).then((uploads) => {
        res.status(201).json({
          status: 201,
          data: uploads
        });
      }).catch((err) => {
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

  async findByUser(req, res) {
    try {
      const {user_id} = req.query;
      await Upload.find({user_id}, (err, uploads) => {
        if (err) {
          res.statusCode(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: uploads
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

  async findByAlbum(req, res) {
    try {
      const {album_id} = req.query;
      await Upload.find({album_id}, (err, uploads) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: uploads
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
      const {file_id} = req.params;
      await Upload.findById(file_id, (err, upload) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: upload
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
      const {file_id} = req.params;
      await Upload.findByIdAndDelete(file_id, (err, upload) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          res.status(200).json({
            status: 200,
            data: upload
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
