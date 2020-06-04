//set up
const express = require('express');
const BudgetDetail = require('../models/budgetdetail.js');
const budgetdetails = express.Router();

//ROUTES

//INDEX
budgetdetails.get('/', (req, res) => {
  // res.send("I'm finally reachable")
  BudgetDetail.find({}, (err, allReports) => {
    res.render('budgetdetails/index.ejs', {
      budgetDetails: allReports,
      pageName: 'Budget Summary'
    })
  })
});

//NEW
budgetdetails.get('/new', (req, res) => {
  // res.send("I'm the new page")
  res.render('budgetdetails/new.ejs', {
    pageName: 'Create New Budget Item'
  })
})

//CREATE
budgetdetails.post('/', (req, res) => {
  BudgetDetail.create(req.body, (err, createdDetail) => {
    res.redirect('/budgetdetails')
  })
})

//EDIT

//UPDATE

//SHOW
budgetdetails.get('/:id', (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('budgetdetails/show.ejs', {
      budgetItem: foundItem,
      pageName: 'Budget Item Details'
    })
  })
})

//DELETE

module.exports = budgetdetails;