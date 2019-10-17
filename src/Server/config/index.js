import path from 'path';
import {cors} from '../middlewares';
import env from '../env';
import MainRouter from '../routes';
import pager from '../client';

export default (app, {statics, json, urlencoded}) => {
  const isDevelopment = env.node_env === 'development';
  app.use(cors);
  if (isDevelopment) {
    app.use(require('morgan')('dev'));
  }
  app.use(json());
  app.use(urlencoded({
    extended: false
  }));
  app.use(statics(path.join(__dirname, '../../Client/static'), {
    setHeaders: (res, loc, stat) => {
      res.set('Service-Worker-Allowed', '/');
    }
  }));
  app.use('/api/v1', MainRouter);
  pager(app);
};
