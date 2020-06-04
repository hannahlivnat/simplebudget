const mongoose = require('mongoose');

const budgetPlanSchema = new mongoose.Schema({
  monthlyIncomeEstimate: {
    type: Number,
    required: true,
    min: 0
  },
  flexBudgetEstimate: {
    type: Number,
    required: true,
    min: 1
  },
  firmBudgetEstimate: {
    type: Number,
    required: true,
    min: 1
  },
  userOwned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const BudgetPlan = mongoose.model('BudgetPlan', budgetPlanSchema)
module.exports = BudgetPlan;