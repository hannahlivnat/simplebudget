//_______________________________________
// SET UP MAIN APP'S TOOL BOX
//_______________________________________

//DEPENDENCIES ==========================
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const expressflash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

//CONFIGURATION =========================
require('dotenv').config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGODB_URI;

//MIDDLEWARE ===========================
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//_______________________________________
// ESTABLISH DATABASE CONNECTIONS
//_______________________________________
//CONNECT MONGOOSE TO MONGODB ===========
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//SEND FEEDBACK ON CONNECTION ============
db.on('error', (err) => {
  console.log(err.message + 'is Mongod not running?');
});
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//_______________________________________
// CONNECT TO ALL ROUTER FILES
//_______________________________________
//USERS
const usersController = require('./controllers/users');
app.use('/', usersController);

//SESSIONS
const sessionsController = require('./controllers/sessions');
app.use('/', sessionsController);

//BUDGET DETAILS
const budgetDetailsController = require('./controllers/budgetdetails');
app.use('/budgetdetails', budgetDetailsController);

//BUDGET PLANS
const budgetPlansController = require('./controllers/budgetplans');
app.use('/budgetplans', budgetPlansController);

//_______________________________________
// REDIRECT FROM MAIN ROUTE
//_______________________________________
//lOCALHOST:3000
app.get('/', (req, res) => {
  res.redirect('/budgetdetails');
});

app.get('/about', (req, res) => {
  res.render('about.ejs', {
    pageName: 'About SimplyBudget'
  });
});


//_______________________________________
// TELL APP WHICH PORT TO LISTEN TO 
//_______________________________________
app.listen(PORT, () => console.log('Listening on port:', PORT));