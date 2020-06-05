//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const sessions = require('express-session');

//CONFIG
require('dotenv').config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGODB_URI;



//MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));
//this replaces the body-parser package
app.use(express.urlencoded({
  extended: true
}));
app.use(sessions({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions;

//Connect Mongoose 
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//Error or Success Message
db.on('error', (err) => {
  console.log(err.message + 'is Mongod not running?');
});
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));



//CONTROLLERS
const budgetDetailsController = require('./controllers/budget_details_controller.js');
app.use('/budgetdetails', budgetDetailsController);

const usersController = require('./controllers/users_controller.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

const budgetPlansController = require('./controllers/budget_plans_controller.js');
app.use('/budgetplans', budgetPlansController);

//___________________
// Routes
//___________________
//localhost:3000
app.get('/', (req, res) => {
  res.redirect('/budgetdetails');
});


//LISTEN
app.listen(PORT, () => console.log('Listening on port:', PORT));

//https://medium.com/@adamlehrer/get-your-passport-through-security-with-passport-js-bcrypt-c44f70ac7159