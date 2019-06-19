import {join} from 'path';

export class Pages {
  static serve(app) {
    app.get('/', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/index.html'));
    });
    app.get('/landing', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/landing.html'));
    });
    app.get('/signup', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/signup.html'));
    });
    app.get('/login', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/login.html'));
    });
  }
}
