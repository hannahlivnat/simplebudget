const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');
const users = express.Router();

//ROUTES

//NEW
users.get('/new', (req, res) => {
  res.render('users.new.ejs')
});

//CREATE
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    res.redirect('/')
  })
});


module.exports = User;