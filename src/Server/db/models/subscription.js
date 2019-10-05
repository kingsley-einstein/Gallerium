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
    required: true
  }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

Subscription.findBySubscriber = (subscriber) => Subscription.findOne({
  subscriber
});

export default Subscription;
