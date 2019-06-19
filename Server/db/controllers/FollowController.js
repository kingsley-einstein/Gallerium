import {Follower, Following} from '../models';

export class FollowController {
  async follow(req, res) {
    try {
      const {user_id, following} = req.query;
      await Following.findOne({user_id})
          .then((value) => {
            if (value) {
              value.following.push(following);
              value.save();
              res.status(200).json({
                status: 200,
                data: 'You are now following this person'
              });
            } else {
              Following.create({
                user_id,
                following: [following]
              })
                  .then((f) => {
                    res.status(200).json({
                      status: 200,
                      data: 'You followed someone for the first time'
                    });
                  })
                  .catch((err) => {
                    res.status(err.statusCode || 500).json({
                      status: err.statusCode || 500,
                      message: err.message
                    });
                  });
            }
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

  async newFollower(req, res) {
    try {
      const {user_id, follower} = req.query;
      await Follower.findOne({user_id})
          .then((value) => {
            if (value) {
              value.followers.push(follower);
              value.save();
              res.status(200).json({
                status: 200,
                data: value
              });
            } else {
              Follower.create({
                user_id,
                followers: [follower]
              })
                  .then((f) => {
                    res.status(201).json({
                      status: 201,
                      data: f
                    });
                  })
                  .catch((err) => {
                    res.status(err.statusCode || 500).json({
                      status: err.statusCode || 500,
                      error: err.message
                    });
                  });
            }
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

  async remove(req, res) {
    try {
      const {user_id, following} = req.query;
      await Following.findOne({user_id}, (err, doc) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
        } else {
          if (doc) {
            doc.following.splice(doc.following.indexOf(following), 1);
            doc.save();
            res.status(200).json({
              status: 200,
              data: 'You unfollowed this person'
            });
          }
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
