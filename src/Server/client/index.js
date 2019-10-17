/* eslint-disable no-unused-vars */
import path from 'path';
import {Express} from 'express';

/**
 * @param {Express} app
 */
export default (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/index.html'));
  });
  app.get('/landing', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/landing.html'));
  });
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/login.html'));
  });
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/signup.html'));
  });
  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/home.html'));
  });
  app.get('/home/feeds', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/feeds.html'));
  });
  app.get('/home/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/profile.html'));
  });
  app.get('/home/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/upload.html'));
  });
  app.get('/home/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/settings.html'));
  });
  app.get('/home/search', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/views/search.html'));
  });
};
