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
    required: true,
    enum: ['Income', 'Flex Spending', 'Firm Spending']
  }, //income, flexSpending, or firmSpending
  description: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const BudgetDetail = mongoose.model('BudgetDetail', budgetDetailsSchema);

module.exports = BudgetDetail;