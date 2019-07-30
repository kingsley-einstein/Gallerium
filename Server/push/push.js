import webpush from 'web-push';
import Environment from '../environment';

const {privateKey, publicKey} = new Environment();
webpush.setVapidDetails('mailto:javaprodigy56@gmail.com',
    publicKey,
    privateKey
);

export default webpush;
