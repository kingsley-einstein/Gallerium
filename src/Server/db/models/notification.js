import mongoose, {Schema} from 'mongoose';

const NotificationSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);

Notification.findByOwner = (owner) => Notification.find({
  owner
});

Notification.countByOwnerAndSeen = (owner, seen) => Notification.count({
  owner,
  seen
});

Notification.setSeen = (owner) => Notification.updateMany({
  owner,
  seen: false
}, {
  seen: true
});

export default Notification;
