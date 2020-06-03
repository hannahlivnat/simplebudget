//___________________
// Dependencies
//___________________
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()

//___________________
// Port
//___________________
const PORT = process.env.PORT || 3333

//___________________
// Database
//___________________
const MONGODB_URI = process.env.MONGODB_URI

//___________________
//Connect to Mongo
//___________________

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//___________________
//Error or Success Message
//___________________

db.on('error', (err) => {
  console.log(err.message + 'is Mongod not running?');
});
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({
  extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________

//localhost:3000
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));