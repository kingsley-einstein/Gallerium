import jwt from 'jsonwebtoken';
import db from '../db';
import pusher from '../push-notifs';

const {
  models: {
    Notification,
    Comment,
    FileItem,
    Subscription,
    User,
    Follow
  }
} = db;

/**
 * @author Kingsley Victor
 */
export class Socket {
  /**
   *
   * @param {*} io
   */
  static wire(io) {
    io.on('connect', (socket) => {
      console.log('Connection made to socket with id: ', socket.id);
      socket.on('GET_ALL_NOTIFICATIONS', async (data) => {
        const payload = jwt.decode(data.token);
        const notifs = await Notification.findByOwner(payload.id);
        io.emit('RECEIVED_NOTIFICATIONS', notifs);
      });
      socket.on('COUNT_ALL_NOTIFICATIONS', async (data) => {
        const payload = jwt.decode(data.token);
        const count = await Notification.countByOwnerAndSeen(payload.id, false);
        io.emit('RECEIVED_NOTIFS_COUNT', count);
      });
      socket.on('CREATE_COMMENT', async (data) => {
        const payload = jwt.decode(data.token);
        const comment = await Comment.create({
          madeBy: payload.id,
          file: data.file_id,
          actual: data.actual
        });
        const file = await FileItem.findById(comment.file);
        const commenter = await User.findById(comment.madeBy);
        const subscription = await Subscription.findBySubscriber(file.owner);
        if (subscription) {
          const push_subscription = {
            endpoint: subscription.endpoint,
            keys: JSON.parse(subscription.keys)
          };
          const push_payload = {
            message: `${commenter.username} commented on your upload: ${file.caption}`,
            title: 'New comment on upload'
          };
          pusher.sendNotification(push_subscription, JSON.stringify(push_payload)).then(() => {
            console.log('Sent Push');
          });
        }
        await Notification.create({
          owner: file.owner,
          message: `${commenter.username} commented on your upload: ${file.caption}`,
          seen: false
        });
        io.emit('NEW_COMMENT', comment);
        io.emit('RECEIVED_NOTIFS_COUNT', await Notification.countByOwnerAndSeen(payload.id, false));
      });
      socket.on('DELETE_COMMENT', async (data) => {
        const payload = jwt.decode(data.token);
        const comment = await Comment.findOneAndDelete({
          madeBy: payload.id
        });
        io.emit('COMMENT_DELETED', comment);
      });
      socket.on('FOLLOW', async (data) => {
        const {token, followed} = data;
        const payload = jwt.decode(token);
        const follow = await Follow.create({
          owner: payload.id,
          followed
        });
        const follower = await User.findById(follow.owner);
        const subscription = await Subscription.findByOwner(follow.followed);
        if (subscription) {
          const push_subscription = {
            endpoint: subscription.endpoint,
            keys: JSON.parse(subscription.keys)
          };
          const push_payload = {
            message: `${follower.username} followed you`,
            title: 'Someone followed you'
          };
          pusher.sendNotification(push_subscription, JSON.stringify(push_payload)).then(() => {
            console.log('Sent push');
          });
        }
        await Notification.create({
          owner: follow.followed,
          message: `${follower.username} followed you`,
          seen: false
        });
        io.emit('RECEIVED_NOTIFS_COUNT', await Notification.countByOwnerAndSeen(payload.id, false));
      });
      socket.on('LIKE', async (data) => {});
    });
  }
}
