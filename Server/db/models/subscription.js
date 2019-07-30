import {Schema, model} from 'mongoose';

const SubscriptionSchema = new Schema({
  endpoint: {
    type: String,
    required: {
      message: 'Endpoint is necessary to create subscription'
    }
  },
  p256dh: {
    type: String,
    required: true
  },
  auth: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const Subscription = model('Subscription', SubscriptionSchema);
