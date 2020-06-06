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
      req.session.userId = foundUser._id;

      BudgetPlan.find({
          user: req.session.userId
        },
        (err, budgetplan) => {
          if (err) {
            console.log(err);
          } else {
            req.session.currentBudgetPlan = budgetplan;
            res.send(req.session.currentBudgetPlan);
          }

        }
      )
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