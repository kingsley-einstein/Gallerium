import {config} from 'dotenv';
import {join} from 'path';

config({
  path: join(__dirname, '/.env')
});

export default class Environment {
  constructor() {
    this._db_uri = process.env.DB_URI;
    this.secretOrKey = process.env.JWT_SECRET;
    this.cloud_name = process.env.CLOUD_NAME;
    this.api_key = process.env.API_KEY;
    this.api_secret = process.env.API_SECRET;
    this.folder = process.env.FOLDER;
  }
}
