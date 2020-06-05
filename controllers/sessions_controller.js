//DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();

const User = require('../models/users.js');

//ROUTES

//NEW
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser,
    pageName: 'Log In Page'
  })
});

//CREATE
sessions.post('/', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('Our database ran into a problem, our fault!')
    } else if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
      res.send('Sorry, your username or password is incorrect');
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect('/budgetdetails')
    } else {
      res.send('combining the user and password messages did not work')
    }
  })
});

//DELETE
sessions.delete('/', (req, res) => {
  req.sessions.destroy(() => {
    res.redirect('/budgetdetails')
  })
});

//EXPORT
module.exports = sessions;