const mongoose = require('mongoose');

//create user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //links to budget plan collection
  budgetPlan: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BudgetPlan'
  }],
  //links to expense and income collection
  budgetDetails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BudgetDetail'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema)
module.exports = User;





//references: 
/*
https://thinkster.io/tutorials/node-json-api/creating-the-user-model
https://medium.com/employbl/build-database-relationships-with-node-js-and-mongodb-74e35c315cf
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/























module.exports = User