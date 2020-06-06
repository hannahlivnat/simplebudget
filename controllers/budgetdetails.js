//_______________________________________
// SET UP BUDGET DETAILS TOOL BOX
//_______________________________________
const express = require('express');
const router = express.Router();
const BudgetDetail = require('../models/budgetdetail.js');
const BudgetPlan = require('../models/budgetplan.js');

//CHECK THAT USER IS LOGGED IN---------
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/login');
  }
}

//_______________________________________
// BUDGET DETAILS ROUTES
//_______________________________________

//SIMPLY BUDGET HOME PAGE AFTER LOG IN -- INDEX ROUTE
router.get('/', isAuthenticated, (req, res) => {
  BudgetDetail.find({}, (err, allReports) => {
    res.render('budgetdetails/index.ejs', {
      budgetDetails: allReports,
      pageName: 'Budget Summary',
      currentUser: req.session.currentUser,
      budgetplan: req.session.currentbudgetplan
    })
  })
});

//NEW
router.get('/new', isAuthenticated, (req, res) => {
  console.log(req.session);
  res.render('budgetdetails/new.ejs', {
    pageName: 'Create New Budget Item',
    currentUser: req.session.currentUser,
    budgetplan: req.session.currentbudgetplan
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
      currentUser: req.session.currentUser,
      budgetPlan: req.session.currentbudgetplan
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
      currentUser: req.session.currentUser,
      budgetPlan: req.session.currentbudgetplan
    })
  })
});

//DELETE
router.delete('/:id', (req, res) => {
  BudgetDetail.findByIdAndRemove(req.params.id, (err, budgetItem) => {
    res.redirect('/budgetdetails/')
  })
});

//_______________________________________
// EXPORT BUDGET DETAILS
//_______________________________________
module.exports = router;