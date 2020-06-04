const mongoose = require('mongoose');

const budgetDetailsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

const BudgetDetail = mongoose.model('BudgetDetail', budgetDetailsSchema);
module.exports = BudgetDetail;