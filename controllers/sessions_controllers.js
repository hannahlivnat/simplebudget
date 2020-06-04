const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

//ROUTES

//NEW
//renders log in page
// sessions.get('/new', (req, res) => {
//   res.render('sessions/new.ejs', {
//     currentUser: req.session.currentUser
//   })
// });

//CREATE
//checks that password and username match document in user database
// sessions.post('/', (req, res) => {
//   User.findOne({
//     username: req.body.username
//   }, (err, foundUser) => {
//     if (err) {
//       console.log(err)
//       //fix to render error page
//       res.send('Our database ran into a problem, Our fault');
//       //still testing if this works - should compare username and password
//     } else if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
//       //fix to render error page
//       res.send('Sorry, your username or password is incorrect');
//     } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//       res.session.currentUser = foundUser;
//       res.redirect('/originalCollectionName');
//     } else {
//       //delete if works
//       res.send('combining the user and password authentication did not work, refactor')
//     }
//   })
// });

//DELETE
//triggered on log out
// sessions.delete('/', (req, res) => {
//   req.sessions.destroy(() => {
//     res.redirect('/')
//   })
// });

module.exports = sessions;