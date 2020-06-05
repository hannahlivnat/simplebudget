//DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users.js');
const BudgetPlan = require('../models/budgetplan.js');

//MIDDLEWARE
sessions.use(passport.initialize());
sessions.use(passport.session()); //persistent login sessions;

// passport.use(new LocalStrategy(
//   function (username, password, done) {
//     User.findOne({
//       username: username
//     }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, {
//           message: 'Incorrect username.'
//         });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, {
//           message: 'Incorrect password.'
//         });
//       }
//       return done(null, user);
//     });
//   }
// ));

//ROUTES

//NEW
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser,
    pageName: 'Log In Page'
  })
});

//CREATE
sessions.post('/', passport.authenticate('local', {
    successRedirect: '/budgetdetails',
    failureRedirect: '/login',
    failureFlash: true
  })

  // User.findOne({
  //   username: req.body.username
  // }, (err, foundUser) => {
  //   if (err) {
  //     console.log(err);
  //     res.send('Our database ran into a problem, our fault!')
  //   } else if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
  //     res.send('Sorry, your username or password is incorrect');
  //   } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
  //     req.session.currentUser = foundUser;
  //     res.redirect('/budgetdetails')
  //   } else {
  //     res.send('combining the user and password messages did not work')
  //   }
  // })
);

//DELETE
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/budgetdetails')
  })
});

//EXPORT
module.exports = sessions;