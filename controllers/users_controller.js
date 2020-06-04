//DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

//CONFIG
const users = express.Router();

//ROUTES

//NEW
users.get('/new', (req, res) => {
  // res.send('Hello, I am New!')
  res.render('users/new.ejs', {
    pageName: 'Sign Up Page'
  })
});

//CREATE
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    res.redirect('/budgetdetails')
  })
});

//EXPORT USER
module.exports = users;