import webpush from 'web-push';
import env from '../../env';

webpush.setVapidDetails(`mailto:${env.mailto}`, env.push_public_key, env.push_private_key);

export default webpush;
