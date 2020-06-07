//_______________________________________
// SET UP TOOL BOX FOR SESSIONS ROUTER
//_______________________________________
const express = require('express');
const router = express.Router();

//TOOLS FOR USER AUTHENTICATION UPON LOGIN
const bcrypt = require('bcrypt');


//CONNECT USER DATABASE
const User = require('../models/user');
const BudgetPlan = require('../models/budgetplan');
const BudgetDetail = require('../models/budgetdetail');

//_______________________________________
// LOG IN AND LOG OUT OF SESSION - ROUTES
//_______________________________________

//LOCALHOST:3000/LOGIN --- NEW ROUTE
router.get('/login', (req, res) => {
  res.render('sessions/login.ejs', {
    pageName: 'Log In Page',
    currentUser: req.session.currentUser,
  })
});

//ESTABLISH LOGIN SESSION IF SUCCESSFUL ---- CREATE ROUTE
router.post('/sessions', (req, res) => {
  const currentDate = new Date();
  const mindate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
  console.log(mindate);

  const maxdate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  console.log(maxdate);

  User.findOne({
    username: req.body.username
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('Our database ran into a problem, our fault!')
    } else if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
      res.send('Sorry, your username or password is incorrect');
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      foundUser.populate('budgetplan').execPopulate();
      foundUser.populate({
        path: 'budgetdetails',
        match: {
          date: {
            $gt: mindate,
            $lt: maxdate
          }
        }
      }).execPopulate();
      req.session.currentUser = foundUser;
      req.session.userId = foundUser._id;

      //It doesn't seem like I shouldn't need this section, but when I take it out, my budget plan and budget details
      //won't populate (??????????)
      BudgetPlan.find({
        user: req.session.userId
      }).limit(1).exec(
        (err, budgetplan) => {
          if (err) {
            console.log(err);
          } else {
            // req.session.currentbudgetplan = budgetplan;
            BudgetDetail.find({
              user: req.session.userId
            }).exec(
              (err, budgetdetails) => {
                if (err) {
                  console.log(err);
                } else {
                  if ((budgetplan).length === 0) {
                    res.redirect('/budgetplans/new');
                  } else {
                    res.redirect('/budgetdetails');
                  }
                }
              }
            )
          }
        });
    }
  })
});


//END LOGGED-IN SESSION ---- DESTROY ROUTE
router.delete('/sessions', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/budgetdetails')
  })
});

//_______________________________________
// EXPORT ROUTER TO SERVER.JS
//_______________________________________
module.exports = router;