import jwt from 'jsonwebtoken';
import db from '../db';

const {
  models: {
    Notification
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
    });
  }
}
