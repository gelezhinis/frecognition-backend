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
   connection: process.env.DATABASE_URL
   // connection: {
   //    connectionString: process.env.DATABASE_URL,
   //    ssl: true
   // }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send("It's working! Finally!!!");
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

app.listen(process.env.PORT || 5000, () => {
   console.log(`app is running on PORT ${process.env.PORT}`);
});

/*
Server blueprint:

/ (GET) --> res = users
/signin (POST) --> res = success/fail
/register (POST) --> res = user
/profile/:userId (GET) --> res = user
/image (PUT) --> res = user.entries
*/ 