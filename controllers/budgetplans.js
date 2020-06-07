//_______________________________________
// SET UP BUDGET PLANS TOOL BOX
//_______________________________________
const express = require('express');
const router = express.Router();

const BudgetPlan = require('../models/budgetplan.js');
const User = require('../models/user');


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
      //push into req.session
      (req.session.currentbudgetplan).push(createdPlan);
      req.session.currentUser.budgetplan.push(createdPlan);

      User.findByIdAndUpdate(req.session.userId, {
        $push: {
          budgetplan: createdPlan._id
        }
      }, {
        safe: true,
        upsert: true
      }, (err, doc) => {
        if (err) {
          res.send(err.message)
        } else {
          console.log(req.session.currentUser);
          res.redirect('/budgetdetails')
        }
      })

    }

  })
});

//EDIT

router.get('/:id/edit', isAuthenticated, (req, res) => {
  BudgetPlan.findById(req.params.id, (err, foundPlan) => {
    res.render('budgetplans/edit.ejs', {
      budgetPlan: foundPlan,
      pageName: 'Edit Budget Plan',
      currentUser: req.session.currentUser,
      budgetplan: req.session.currentbudgetplan
    })
  })
})

//UPDATE
router.put('/:id', (req, res) => {
  BudgetPlan.findByIdAndUpdate(req.params.id, req.body, (err, updatedPlan) => {
    res.redirect('/budgetdetails/');
  })
});
//_______________________________________
// EXPORT BUDGETPLANS
//_______________________________________
module.exports = router;