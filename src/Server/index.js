import express from 'express';
import mongoose from 'mongoose';
import io from 'socket.io';
import env from './env';
import configure from './config';
import {Socket} from './helpers';

const app = express();
const appOpts = {
  statics: express.static,
  json: express.json,
  urlencoded: express.urlencoded
};

configure(app, appOpts);

const {port, mongo_dev_uri, mongo_prod_uri, mongo_test_uri, node_env} = env;

// Object with keys specifying environments. URIs specific to each environment would be loaded
const mongo_uris = {
  development: mongo_dev_uri,
  production: mongo_prod_uri,
  test: mongo_test_uri
};

// Select DB URI to use based on environment
const MONGO_URI = mongo_uris[node_env];

// MongoDB options
const mongo_opts = {
  socketOptions: {
    keepAlive: true
  },
  useNewUrlParser: true
};

mongoose.connect(MONGO_URI, mongo_opts, (error) => {
  if (error) {
    throw new Error(JSON.stringify({
      error
    }));
  }
  const server = app.listen(port[node_env], () => {
    const IO = io(server);
    Socket.wire(IO);
    console.log(`Server listening on ${port[node_env]}`);
  });
});

// Export app for test purposes
export default app;
