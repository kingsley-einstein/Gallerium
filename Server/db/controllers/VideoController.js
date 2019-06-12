import {Video} from '../models';

export class VideoController {
  async create(req, res) {
    try {
      const {body, file, query} = req;
      const {url} = file;
      const {user_id} = query;
      body.url = url;
      body.user_id = user_id;
      await Video.create(body)
          .then((video) => {
            res.status(200).json({
              status: 200,
              data: video
            });
          })
          .catch((err) => {
            res.status(err.statusCode || 500).json({
              status: err.statusCode || 500,
              erro: err.message
            });
          });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        error: err.message
      });
    }
  }
}
