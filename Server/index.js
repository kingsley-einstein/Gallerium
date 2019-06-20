import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import router from './routes';
import Config from './config';
import Environment from './environment';
import {Passport} from './auth';

const app = express();
const opts = {
  json: express.json,
  urlencoded: express.urlencoded,
  statics: express.static
};
const {PORT} = process.env;
const port = PORT || 4516;
const config = new Config();
const environment = new Environment();
const passport = new Passport();
const {_db_uri} = environment;
const options = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

config.use(app, opts, passport, logger, router);

mongoose.connect(_db_uri, options, (err) => {
  if (err) console.log(err);
  else {
    app.listen(port, () => {
      console.log(`Express server running on port: ${port}`);
    });
  }
});
