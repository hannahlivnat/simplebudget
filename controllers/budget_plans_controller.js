//SET UP
const express = require('express');
const BudgetPlan = require('../models/budgetplan.js');
const budgetplans = express.Router();

//CHECK THAT USER IS LOGGED IN
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new');
  }
}
//ROUTES

//INDEX
budgetplans.get('/', isAuthenticated, (req, res) => {
  BudgetPlan.get({}, (err, allPlan) => {
    res.render('/budgetplans/index.ejs', {
      pageName: 'Budget Plan',
      currentUser: req.session.currentUser,
      budgetPlan: allPlan
    })
  })
});

//NEW
budgetplans.get('/new', isAuthenticated, (req, res) => {
  res.render('budgetplans/new.ejs', {
    pageName: 'New Budget Plan',
    currentUser: req.session.currentUser,
  })
});

//POST
budgetplans.post('/', (req, res) => {
  req.body.user = (req.session.currentUser)._id
  BudgetPlan.create(req.body, (err, createdPlan) => {
    res.redirect('/budgetdetails')
  })
});

//EXPORT
module.exports = budgetplans;