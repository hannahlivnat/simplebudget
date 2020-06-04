const express = require('express');
const BudgetDetail = require('../models/budgetdetail.js');
const budgetDetails = express.Router();

//ROUTES ---------------------------------

//INDEX
//Displays all budget data, links to show page 
//for each income and expense item
budgetDetails.get('/', (req, res) => {
  res.send("Able to access budget details index")
  // BudgetDetail.find({}, (err, allReports) => {
  //   res.render('/budgetdetails/index.ejs', {
  //     budgetDetails: allData,
  //     pageName: 'Budget Summary'
  //   })
  // })
});

//SHOW
//individual show page for each expense or income
//will show the description and date of expense/income
//will have edit and delete links on this page
budgetDetails.get('/:id', (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('show.ejs', {
      budgetItem: foundItem,
      pageName: 'Budget Item Details'
    })
  })
});

//NEW
//leads to form that creates new expense or income
budgetDetails.get('/new', (req, res) => {
  res.render('new.ejs', {
    pageName: 'New Budget Item'
  });
});

//CREATE
budgetDetails.post('/', (req, res) => {
  BudgetDetail.create(req.body, (err, createdItem) => {
    res.redirect('/')
  })
});


//EDIT
budgetDetails.get('/:id/edit', (req, res) => {
  BudgetDetail.findById(req.params.id, (err, foundItem) => {
    res.render('edit.js', {
      item: foundItem,
      pageName: 'Edit Budget Item'
    })
  })
});

//UPDATE
budgetDetails.put('/:id', (req, res) => {
  BudgetDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, updateItem) => {
    res.redirect('/')
  })
});

//DESTROY
budgetDetails.delete('/:id', (req, res) => {
  BudgetDetail.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/')
  })
});



module.exports = BudgetDetail;