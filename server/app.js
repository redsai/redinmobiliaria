import express from 'express'
import bodyParser from 'body-parser'

var favicon = require('serve-favicon');
import { auth, property, shopping } from './routes'
const app = express();
const cors = require('cors');
const multer = require('multer');
import path from 'path';

export const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dektmktxk',
  api_key: '269429552754125',
  api_secret: 'd2G9rTOJb-WGsJdlG21N-N9PWio'
});
app.get(path.resolve(process.cwd()+ '/dist/frontend/favicon.ico'), (req, res) => res.status(204))
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
  app.use('/api/auth', auth)
  app.use('/api/property', property)
  app.use('/api/shopping', shopping)
  app.use('/uploads', express.static(path.resolve('uploads')));
}

if (process.env.NODE_ENV === 'production') {
  //app.use('/', express.static(path.join(__dirname, '/dist/frontend')))
  app.use('/api/auth', auth)
  app.use('/api/property', property)
  app.use('/api/shopping', shopping)
  app.use('/uploads', express.static(path.resolve('uploads')));
  
  app.use('/', express.static(path.join(process.cwd(), 'dist/frontend')))
  app.get('/*', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  /*app.get('/register', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/login', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/home', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/profile', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/comments', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/CommentsShopping', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/file', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/settings', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/property/:id', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/TerminosDeUso', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/PoliticaPrivacidad', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); 
  app.get('/PoliticaUsoCookies', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/dist/frontend/index.html'));
  }); */
  
}



export default app