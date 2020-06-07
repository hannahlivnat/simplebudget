//_______________________________________
// SET UP BUDGET DETAILS TOOL BOX
//_______________________________________
const express = require('express');
const router = express.Router();
const BudgetDetail = require('../models/budgetdetail');
const BudgetPlan = require('../models/budgetplan');
const User = require('../models/user');

//CHECK THAT USER IS LOGGED IN---------
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
    next()
  } else {
    res.redirect('/budgetplans/new')
  }
};

//_______________________________________
// BUDGET DETAILS ROUTES
//_______________________________________

//SIMPLY BUDGET HOME PAGE AFTER LOG IN -- INDEX ROUTE
router.get('/', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
  res.render('budgetdetails/index.ejs', {
    pageName: 'Budget Summary',
    budgetdetails: req.session.currentbudgetdetails,
    currentUser: req.session.currentUser,
    budgetplan: req.session.currentbudgetplan
  })
});

//NEW
router.get('/new', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
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
      //push into req.session
      req.session.currentbudgetdetails.push(createdDetail)
      req.session.currentUser.budgetdetails.push(createdDetail.id);
      //try to push into user array
      User.findByIdAndUpdate(req.session.userId, {
        $push: {
          budgetdetails: createdDetail
        }
      }, {
        safe: true,
        upsert: true
      }, (err, doc) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log(req.session);
          res.redirect('/budgetdetails')

        }
      })

    }
  })
});

//EDIT
router.get('/:id/edit', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('budgetdetails/edit.ejs', {
      budgetItem: foundItem,
      pageName: 'Edit Item Details',
      currentUser: req.session.currentUser,
      budgetplan: req.session.currentbudgetplan
    })
  })
});

//UPDATE - works
router.put('/:id', (req, res) => {
  BudgetDetail.findByIdAndUpdate(req.params.id, req.body, (err, updatedItem) => {
    res.redirect(`/budgetdetails/${updatedItem._id}`);
  })
});

//SHOW - works
router.get('/:id', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    if (err) {
      res.send(err.message)
    } else {
      res.render('budgetdetails/show.ejs', {
        budgetItem: foundItem,
        pageName: 'Budget Item Details',
        currentUser: req.session.currentUser,
        budgetplan: req.session.currentbudgetplan
      })
    }

  })
});

//DELETE
router.delete('/:id', (req, res) => {
  BudgetDetail.findByIdAndRemove(req.params.id, (err, budgetItem) => {
    req.session.currentbudgetdetails
    res.redirect('/budgetdetails/')
  })
});

//_______________________________________
// EXPORT BUDGET DETAILS
//_______________________________________
module.exports = router;