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
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

//MAKE SURE USER DOESN'T HAVE BUDGET PLAN ALREADY
const doesUserHaveBudgetPlan = (req, res, next) => {
  if ((req.session.user.budgetplan).length > 0) {
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
    budgetdetails: req.session.user.budgetdetails,
    currentUser: req.session.user,
    budgetplan: req.session.user.budgetplan
  })
});

//NEW
router.get('/new', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
  res.render('budgetdetails/new.ejs', {
    pageName: 'Create New Budget Item',
    currentUser: req.session.user,
    budgetplan: req.session.user.budgetplan
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
      req.session.user.budgetdetails.push(createdDetail);
      //push into user array
      User.findByIdAndUpdate(req.session.userId, {
        $push: {
          budgetdetails: createdDetail._id
        }
      }, {
        safe: true,
        upsert: true
      }, (err, doc) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log(req.session.user);
          res.redirect('/budgetdetails')

        }
      })

    }
  })
});

//EDIT
router.get('/:id/edit', isAuthenticated, doesUserHaveBudgetPlan, (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    if (err) {
      console.log(err);

    } else {
      res.render('budgetdetails/edit.ejs', {
        budgetItem: foundItem,
        pageName: 'Edit Item Details',
        currentUser: req.session.user,
        budgetplan: req.session.user.budgetplan,
        budgetdetails: req.session.user.budgetdetails,

      })
    }
  })
});

//UPDATE - works
router.put('/:id', (req, res) => {
  BudgetDetail.findById(req.params.id, (err, budgetItem) => {
    if (err) {
      console.log(err);
    } else {
      BudgetDetail.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      }, (err, updatedItem) => {
        let budgetArray = req.session.user.budgetdetails
        let updateThisOne = budgetArray.findIndex(x => x._id === req.params.id)
        //changed this
        budgetArray[updateThisOne] = updatedItem;
        budgetArray.splice(updateThisOne, 1, updatedItem);
        res.redirect(`/budgetdetails/${updatedItem._id}`);
      })
    }
  });

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
        budgetdetails: req.session.user.budgetdetails,
        currentUser: req.session.user,
        budgetplan: req.session.user.budgetplan
      })
    }

  })
});

//DELETE
router.delete('/:id', (req, res) => {
  BudgetDetail.findByIdAndRemove(req.params.id, (err, budgetItem) => {
    if (err) {
      console.log(err.message);
    } else {
      let budgetArray = req.session.user.budgetdetails
      console.log(budgetArray);
      let removeThisObject = budgetArray.indexOf(budgetItem._id)
      budgetArray.splice(removeThisObject, 1);
      User.findByIdAndUpdate(req.session.userId, {
        $pull: {
          budgetdetails: {
            "_id": budgetItem._id
          }
        }
      }, {
        safe: true,
        upsert: true
      }, (err, success) => {
        if (err) {
          console.log(err.message);

        } else {
          res.redirect('/budgetdetails')
        }
      })
    }
  })
});

//_______________________________________
// EXPORT BUDGET DETAILS
//_______________________________________
module.exports = router;