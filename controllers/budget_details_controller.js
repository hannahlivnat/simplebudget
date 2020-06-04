//set up
const express = require('express');
const BudgetDetail = require('../model/budgetdetail.js');
const budgetdetails = express.Router();

//ROUTES

//INDEX
budgetdetails.get('/', (req, res) => {
  res.send("I'm finally reachable")
});

//NEW

//CREATE


//EDIT

//UPDATE

//SHOW

//DELETE

module.exports = budgetdetails;