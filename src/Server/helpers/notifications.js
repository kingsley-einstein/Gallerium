import pusher from '../push-notifs';

export const notify = (subscription, payload) => pusher.sendNotification({
  endpoint: subscription.endpoint,
  keys: JSON.parse(subscription.keys)
}, payload);
