//_______________________________________
// SET UP TOOL BOX FOR SESSIONS ROUTER
//_______________________________________
const express = require('express');
const router = express.Router();

//TOOLS FOR USER AUTHENTICATION UPON LOGIN
const bcrypt = require('bcrypt');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const expressflash = require('express-flash');


//CONNECT USER DATABASE ===============
const User = require('../models/user');
const BudgetPlan = require('../models/budgetplan');
const BudgetDetail = require('../models/budgetdetail');

//CONFIGURE PASSPORT ===================

passport.use(new LocalStrategy({
    passReqtoCallback: true
  },
  (username, password, done) => {
    User.findOne({
      username: username
    }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false)
      }
      //this should set 'req.user' to the user object after authentication
      return done(null, user);
    })
  }));


passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err)
    }
    done(null, user)
  })
});


//_______________________________________
// LOG IN AND LOG OUT OF SESSION - ROUTES
//_______________________________________

//LOCALHOST:3000/LOGIN --- NEW ROUTE
router.get('/login', (req, res) => {
  res.render('sessions/login.ejs', {
    pageName: 'Log In Page',
    currentUser: req.session.user,
  })
});

//ESTABLISH LOGIN SESSION IF SUCCESSFUL ---- CREATE ROUTE
router.post('/sessions', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    req.session.user = req.user;

    const currentDate = new Date();
    const mindate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
    const maxdate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    User.findOne({
      username: req.body.username
    }, (err, foundUser) => {
      if (err) {
        console.log(err);
        res.send('Our database ran into a problem, our fault!')
      }
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
      req.session.user = foundUser;
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