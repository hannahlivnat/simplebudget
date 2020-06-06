//_______________________________________
// SET UP BUDGET PLANS TOOL BOX
//_______________________________________
const express = require('express');
const router = express.Router();

const BudgetPlan = require('../models/budgetplan.js');

//CHECK THAT USER IS LOGGED IN ----------
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/login');
  }
}

//MAKE SURE USER DOESN'T HAVE BUDGET PLAN ALREADY
const doesUserHaveBudgetPlan = (req, res, next) => {
  if ((req.session.currentbudgetplan).length > 0) {
    res.send("You already have a budget plan!")
  } else {
    next();
  }
}

//_______________________________________
// ROUTES
//_______________________________________

//INDEX
router.get('/', isAuthenticated, (req, res) => {
  res.render('/budgetplans/index.ejs', {
    pageName: 'Budget Plan',
    currentUser: req.session.currentUser,
    budgetplan: req.session.currentbudgetplan
  })
});

//NEW
router.get('/new', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
  res.render('budgetplans/new.ejs', {
    pageName: 'New Budget Plan',
    currentUser: req.session.currentUser,
    budgetplan: req.session.currentbudgetplan
  })
});

//POST
router.post('/', (req, res) => {
  const newBudgetPlan = {
    "expectedincome": req.body.expectedincome,
    "expectedflexexpenses": req.body.expectedflexexpenses,
    "expectedfirmexpenses": req.body.expectedfirmexpenses,
    "user": req.session.userId
  }
  BudgetPlan.create(newBudgetPlan, (err, createdPlan) => {
    if (err) {
      res.send(err.message)
    } else {
      req.session.currentbudgetplan = createdPlan;
      console.log(req.session.currentbudgetplan);
      res.redirect('/budgetdetails')
    }

  })
});

//_______________________________________
// EXPORT BUDGETPLANS
//_______________________________________
module.exports = router;