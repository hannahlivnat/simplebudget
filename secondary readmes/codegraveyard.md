```
//=====================RIP CODE==============================
  // sessions_controller.js
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

  // const passport = require('passport'),
  // LocalStrategy = require('passport-local').Strategy;
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

const BudgetPlan = require('../models/budgetplan.js');
//MIDDLEWARE
sessions.use(passport.initialize());
sessions.use(passport.session()); //persistent login sessions;



// entire session_controller.js file - attempting to combine with server.js to make passport work

//DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const sessionsrouter = express.Router();
const passport = require('passport');
const flash = require('express-flash');


//CONNECT TO OTHER FILES
const initializePassport = require('../config/passport-config')
initializePassport(passport,
  username = () => {
    //find where the user.username is equal to the username we passed in above
    return User.find(user => User.username === username)
  }
)

//==========================================
// ROUTES
//==========================================

//NEW
sessionsrouter.get('/login', (req, res) => {
  res.render('sessions/login.ejs', {
    currentUser: req.session.currentUser,
    pageName: 'Log In Page'
  })
});

//CREATE
sessionsrouter.post('/', passport.authenticate('local', {
  successRedirect: '/budgetdetails',
  failureRedirect: '/login',
  failureFlash: true
}));

//DELETE
sessionsrouter.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/budgetdetails')
  })
});

//EXPORT
module.exports = sessionsrouter;


//from server.js file

const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

//brought sessions back to life -- putting passport and flash on the backburner for now

// const passport = require('passport');
// const flash = require('express-flash');

//_______________________________________
// GET PASSPORT SET UP
// CONNECT TO EXISTING PASSPORT FILE
//_______________________________________
//CONNECT TO PASSPORT CONFIGURATION FILE
// const initializePassport = require('./config/passport-config')

// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session()); //persistent login sessions;

//FUNCTION FROM PASSPORT CONFIG FILE
// initializePassport(passport,
//   username = () => {
//     //FIND THE USERNAME IN THE DATABASE EQUAL TO THE USERNAME WE PASSED IN
//     return User.find(user => User.username === username)
//   }
// )

app.post('/', passport.authenticate('local', {
  successRedirect: '/budgetdetails',
  failureRedirect: '/login',
  failureFlash: true
}));


//still sessions, trying to locate budget plan through user id and load it into the session

      BudgetPlan.findOne({
        user: req.session.userId
      }, (err, foundBudgetPlan) => {
        if (err) {
          res.send(err)
        } else {
          if (foundBudgetPlan === 'undefined' || foundBudgetPlan === 'null') {
            res.session.budgetPlan = null
            res.redirect('/budgetplans/new')
          } else {
            req.session.budgetPlan = foundBudgetPlan
            console.log(req.session.budgetPlan)
            res.redirect('/budgetdetails')
          }
        }

      })

      BudgetPlan.find({
          user: req.session.userId
        })
        .limit(1)
        .catch(err => {
          console.log('Caught: ', err.message);
        })
        .then(budgetplan => {
          if (!budgetplan) {
            res.session.budgetplan = null;
            console.log(res.session.budgetplan);
            res.redirect('/budgetplans/new');
          } else {
            res.session.budgetplan = budgetplan;
            console.log(res.session.budgetplan);
            res.redirect('/budgetdetails');
          }
        })

          // if (err) {
          //   res.send(err);
          // } else {
          //   if (!budgetplan) {
          //     req.session.budgetplan = null;
          //     console.log(res.session.budgetplan);
          //     res.redirect('/budgetplans/new');
          //   } else {
          //     req.session.budgetplan = budgetplan;
          //     console.log(res.session.budgetplan);
          //     res.redirect('/budgetdetails');
          //   }
          // }

//trying to get populate to work again
      let user = foundUser;
      user.populate("BudgetPlan").exec(function (err, budgetplan) {
        if (err) {
          res.send(err.message)
        } else {
          console.log('The budget plan is ', budgetplan);

        }
      })
      // populate budgetdetails and budgetplan here
      foundUser.populate('budgetplans').populate('budgetdetailss').execPopulate();

```