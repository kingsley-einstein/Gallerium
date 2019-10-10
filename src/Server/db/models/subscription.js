import mongoose, {Schema} from 'mongoose';

const SubscriptionSchema = new Schema({
  endpoint: {
    type: String,
    required: {
      message: 'Subscription endpoint required'
    }
  },
  keys: {
    type: String,
    required: {
      message: 'Keys are required'
    }
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

Subscription.findBySubscriber = (subscriber) => Subscription.findOne({
  subscriber
});

Subscription.deleteBySubscriber = (subscriber) => Subscription.delete({
  subscriber
});

Subscription.editBySubscriber = (subscriber, update) => Subscription.findOneAndUpdate({
  subscriber
}, update, {
  new: true,
  useFindAndModify: false
});

export default Subscription;
