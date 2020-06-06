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

//_______________________________________
// ROUTES
//_______________________________________

//INDEX
router.get('/', isAuthenticated, (req, res) => {
  res.render('/budgetplans/index.ejs', {
    pageName: 'Budget Plan',
    currentUser: req.session.currentUser,
    budgetPlan: req.session.currentbudgetplan
  })
});

//NEW
router.get('/new', isAuthenticated, (req, res) => {
  res.render('budgetplans/new.ejs', {
    pageName: 'New Budget Plan',
    currentUser: req.session.currentUser,
    budgetPlan: req.session.currentbudgetplan
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
    req.session.currentbudgetplan = createdPlan
    res.redirect('/budgetdetails')
  })
});

//_______________________________________
// EXPORT BUDGETPLANS
//_______________________________________
module.exports = router;