//set up
const express = require('express');
const router = express.Router();

const BudgetDetail = require('../models/budgetdetail.js');
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
router.get('/new', isAuthenticated, (req, res) => {
  // res.send("I'm the new page")
  res.render('budgetdetails/new.ejs', {
    pageName: 'Create New Budget Item',
    currentUser: req.session.currentUser

  })
});

//CREATE
router.post('/', (req, res) => {
  const newBudgetItem = {
    "date": req.body.date,
    "amount": req.body.amount,
    "category": req.body.category,
    "description": req.body.description,
    "user": req.session.userId
  }
  BudgetDetail.create(newBudgetItem, (err, createdDetail) => {
    if (err) {
      res.send(err)
    } else {
      res.redirect('/budgetdetails')

    }
  })
});

//EDIT
router.get('/:id/edit', isAuthenticated, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('budgetdetails/edit.ejs', {
      budgetItem: foundItem,
      pageName: 'Edit Item Details',
      currentUser: req.session.currentUser

    })
  })
});

//UPDATE
router.put('/:id', (req, res) => {
  BudgetDetail.findByIdAndUpdate(req.params.id, req.body, (err, updatedItem) => {
    res.redirect(`/budgetdetails/${updatedItem.id}`);
  })
});

//SHOW
router.get('/:id', isAuthenticated, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('budgetdetails/show.ejs', {
      budgetItem: foundItem,
      pageName: 'Budget Item Details',
      currentUser: req.session.currentUser

    })
  })
});

//DELETE
router.delete('/:id', (req, res) => {
  BudgetDetail.findByIdAndRemove(req.params.id, (err, budgetItem) => {
    res.redirect('/budgetdetails/')
  })
});

module.exports = router;