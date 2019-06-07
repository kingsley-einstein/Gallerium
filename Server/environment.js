import {config} from 'dotenv';
import {join} from 'path';

config({
  path: join(__dirname, '/.env')
});

export default class Environment {
  constructor() {
    this._db_uri = process.env.DB_URI;
  }
}
