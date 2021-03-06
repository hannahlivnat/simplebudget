const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const budgetDetailsSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const BudgetDetail = mongoose.model('BudgetDetail', budgetDetailsSchema);
module.exports = BudgetDetail;