const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  budgetplan: {
    type: Schema.Types.ObjectId,
    ref: 'BudgetPlan'
  },
  budgetdetails: [{
    type: Schema.Types.ObjectId,
    ref: 'BudgetDetail'
  }]
});

//apply uniqueValidator plugin to userSchema - checks for unique username
userSchema.plugin(uniqueValidator, {
  message: 'Sorry, {PATH} needs to be unique'
});

const User = mongoose.model('User', userSchema);
module.exports = User;