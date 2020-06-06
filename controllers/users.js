//_______________________________________
// SET UP USERS TOOLBOX
//_______________________________________
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/user.js');

//_______________________________________
// ROUTES
//_______________________________________

//SIGN UP FOR ACCOUNT --------- NEW ROUTE
router.get('/signup', (req, res) => {
  // res.send('Hello, I am New!')
  res.render('users/signup.ejs', {
    pageName: 'Sign Up Page',
    currentUser: req.session.currentUser,
    budgetplan: req.session.currentbudgetplan
  })
});

//CREATE USER ACCOUNT ------- CREATE ROUTE
router.post('/users', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    if (err) {
      res.send('username is not unique');
    } else {
      res.redirect('/login')
    }
  })
});

//_______________________________________
// EXPORT USERS
//_______________________________________
module.exports = router;