import {webpush} from '../../push';
import {Following, User, Subscription} from '../models';

export class FollowController {
  // async follow(req, res) {
  //   try {
  //     const {user_id, following} = req.query;
  //     await Following.findOne({user_id})
  //         .then((value) => {
  //           if (value) {
  //             value.following.push(following);
  //             value.save();
  //             res.status(200).json({
  //               status: 200,
  //               data: 'You are now following this person'
  //             });
  //           } else {
  //             Following.create({
  //               user_id,
  //               following: [following]
  //             })
  //                 .then((f) => {
  //                   res.status(200).json({
  //                     status: 200,
  //                     data: 'You followed someone for the first time'
  //                   });
  //                 })
  //                 .catch((err) => {
  //                   res.status(err.statusCode || 500).json({
  //                     status: err.statusCode || 500,
  //                     message: err.message
  //                   });
  //                 });
  //           }
  //         })
  //         .catch((err) => {
  //           res.status(err.statusCode || 500).json({
  //             status: err.statusCode || 500,
  //             error: err.message
  //           });
  //         });
  //   } catch (err) {
  //     res.status(err.statusCode || 500).json({
  //       status: err.statusCode || 500,
  //       error: err.message
  //     });
  //   }
  // }

  // async newFollower(req, res) {
  //   try {
  //     const {user_id, follower} = req.query;
  //     await Follower.findOne({user_id})
  //         .then((value) => {
  //           if (value) {
  //             value.followers.push(follower);
  //             value.save();
  //             res.status(200).json({
  //               status: 200,
  //               data: value
  //             });
  //           } else {
  //             Follower.create({
  //               user_id,
  //               followers: [follower]
  //             })
  //                 .then((f) => {
  //                   res.status(201).json({
  //                     status: 201,
  //                     data: f
  //                   });
  //                 })
  //                 .catch((err) => {
  //                   res.status(err.statusCode || 500).json({
  //                     status: err.statusCode || 500,
  //                     error: err.message
  //                   });
  //                 });
  //           }
  //         })
  //         .catch((err) => {
  //           res.status(err.statusCode || 500).json({
  //             status: err.statusCode || 500,
  //             error: err.message
  //           });
  //         });
  //   } catch (err) {
  //     res.status(err.statusCode || 500).json({
  //       status: err.statusCode || 500,
  //       error: err.message
  //     });
  //   }
  // }

  // async remove(req, res) {
  //   try {
  //     const {user_id, following} = req.query;
  //     await Following.findOne({user_id}, (err, doc) => {
  //       if (err) {
  //         res.status(err.statusCode || 500).json({
  //           status: err.statusCode || 500,
  //           error: err.message
  //         });
  //       } else {
  //         if (doc) {
  //           doc.following.splice(doc.following.indexOf(following), 1);
  //           doc.save();
  //           res.status(200).json({
  //             status: 200,
  //             data: 'You unfollowed this person'
  //           });
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     res.status(err.statusCode || 500).json({
  //       status: err.statusCode || 500,
  //       error: err.message
  //     });
  //   }
  // }
  async follow(req, res) {
    try {
      const {user_id, follow_id} = req.query;
      const user = await new Promise((resolve, reject) => {
        User.findById(user_id, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
      const subscription = await new Promise((resolve, reject) => {
        Subscription.findOne(
            {
              user_id: follow_id
            },
            (err, data) => {
              if (err) reject(err);
              resolve(data);
            }
        );
      });
      await Following.findOne({user_id}, (err, data) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statuscode || 500,
            error: err.message
          });
          return;
        }
        if (data) {
          const {username} = user;
          data.following.push(follow_id);
          data.save();
          // webpush.sendNotification({
          //   keys: {
          //     auth: '-----',
          //     p256dh: '-----'
          //   },
          //   endpoint: '-----'
          // }, `${username} started following you`, {
          //   vapidDetails: {
          //     privateKey: '--',
          //     publicKey: '---'
          //   }
          // });
          if (subscription) {
            const {auth, p256dh, endpoint} = subscription;
            const keys = {
              auth,
              p256dh
            };
            webpush.sendNotification(
                {
                  keys,
                  endpoint
                },
                `${username} started following you`
            );
          }
          res.status(200).json({
            status: 200,
            data: 'You started following this person'
          });
        } else {
          const following = [follow_id];
          Following.create({
            user_id,
            following
          })
              .then((d) => {
                if (subscription) {
                  const {auth, p256dh, endpoint} = subscription;
                  const keys = {
                    auth,
                    p256dh
                  };
                  webpush.sendNotification(
                      {
                        keys,
                        endpoint
                      },
                      `${username} started following you`
                  );
                }
                res.status(201).json({
                  status: 201,
                  data: 'You started following this person'
                });
              })
              .catch((err) => {
                res.status(err.statusCode || 500).json({
                  status: err.statusCode || 500,
                  error: err.message
                });
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

  async unfollow(req, res) {
    try {
      const {user_id, follow_id} = req.params;
      await Following.findOne({user_id}, (err, data) => {
        if (err) {
          res.status(err.statusCode || 500).json({
            status: err.statusCode || 500,
            error: err.message
          });
          return;
        }
        if (data) {
          const newArray = data.following.filter((item) => {
            return item != follow_id;
          });
          data.following = newArray;
          data.save();
          res.status(200).json({
            status: 200,
            data: 'You are no longer following this person'
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
