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
    app.get('/home', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/home.html'));
    });
    app.get('/feeds', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/feeds.html'));
    });
    app.get('/profile', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/profile.html'));
    });
    app.get('/settings', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/settings.html'));
    });
    app.get('/upload', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/upload.html'));
    });
    app.get('/collection', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/collection.html'));
    });
    app.get('/followers', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/followers.html'));
    });
    app.get('/search', (req, res) => {
      res.sendFile(join(__dirname, '../../UI/views/search.html'));
    });
  }
}
