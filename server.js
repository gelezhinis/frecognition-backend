const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
   client: 'pg',
   connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'FAKTAS',
      database: 'frecognition'
   }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send(database.users);
});

app.post('/signin', (req, res) => {
   signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
   register.handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
   profile.getProfile(req, res, db);
});

app.put('/image', (req, res) => {
   image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
   image.handleApiCall(req, res);
});

app.listen(5000, () => {
   console.log('app is running on PORT 5000');
});

/*
Server blueprint:

/ (GET) --> res = users
/signin (POST) --> res = success/fail
/register (POST) --> res = user
/profile/:userId (GET) --> res = user
/image (PUT) --> res = user.entries
*/ 