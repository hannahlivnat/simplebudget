const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const budgetPlanSchema = new mongoose.Schema({
  expectedincome: {
    type: Number,
    required: true
  },
  expectedflexexpenses: {
    type: Number,
    required: true
  },
  expectedfirmexpenses: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const BudgetPlan = mongoose.model('BudgetPlan', budgetPlanSchema);

//EXPORT
module.exports = BudgetPlan;