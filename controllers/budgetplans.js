//SET UP
const express = require('express');
const router = express.Router();

const BudgetPlan = require('../models/budgetplan.js');

//CHECK THAT USER IS LOGGED IN
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/login');
  }
}
//ROUTES

//INDEX
router.get('/', isAuthenticated, (req, res) => {
  BudgetPlan.get({}, (err, allPlan) => {
    res.render('/budgetplans/index.ejs', {
      pageName: 'Budget Plan',
      currentUser: req.session.currentUser,
      budgetPlan: allPlan
    })
  })
});

//NEW
router.get('/new', isAuthenticated, (req, res) => {
  res.render('budgetplans/new.ejs', {
    pageName: 'New Budget Plan',
    currentUser: req.session.currentUser,
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
    res.redirect('/budgetdetails')
  })
});

//EXPORT
module.exports = router;