const mongoose = require('mongoose');

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
  }
}, {
  timestamps: true
});

const BudgetPlan = mongoose.model('BudgetPlan', budgetPlanSchema);

//EXPORT
module.exports = BudgetPlan;