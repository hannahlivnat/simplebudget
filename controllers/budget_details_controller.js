//set up
const express = require('express');
const BudgetDetail = require('../models/budgetdetail.js');
const budgetdetails = express.Router();
const BudgetPlan = require('../models/budgetplan.js');


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
budgetdetails.get('/', isAuthenticated, (req, res) => {
  // res.send("I'm finally reachable")
  BudgetDetail.find({}, (err, allReports) => {
    res.render('budgetdetails/index.ejs', {
      budgetDetails: allReports,
      pageName: 'Budget Summary',
      currentUser: req.session.currentUser,
      budgetPlan: BudgetPlan[0]
    })
  })
});

//NEW
budgetdetails.get('/new', isAuthenticated, (req, res) => {
  // res.send("I'm the new page")
  res.render('budgetdetails/new.ejs', {
    pageName: 'Create New Budget Item',
    currentUser: req.session.currentUser

  })
});

//CREATE
budgetdetails.post('/', (req, res) => {
  req.body.user = (req.session.currentUser)._id
  BudgetDetail.create(req.body, (err, createdDetail) => {
    res.redirect('/budgetdetails')
  })
});

//EDIT
budgetdetails.get('/:id/edit', isAuthenticated, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('budgetdetails/edit.ejs', {
      budgetItem: foundItem,
      pageName: 'Edit Item Details',
      currentUser: req.session.currentUser

    })
  })
});

//UPDATE
budgetdetails.put('/:id', (req, res) => {
  BudgetDetail.findByIdAndUpdate(req.params.id, req.body, (err, updatedItem) => {
    res.redirect(`/budgetdetails/${updatedItem.id}`);
  })
});

//SHOW
budgetdetails.get('/:id', isAuthenticated, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('budgetdetails/show.ejs', {
      budgetItem: foundItem,
      pageName: 'Budget Item Details',
      currentUser: req.session.currentUser

    })
  })
});

//DELETE
budgetdetails.delete('/:id', (req, res) => {
  BudgetDetail.findByIdAndRemove(req.params.id, (err, budgetItem) => {
    res.redirect('/budgetdetails/')
  })
});

module.exports = budgetdetails;