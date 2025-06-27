require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const Schema = mongoose.Schema;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connection successful!'))
  .catch((err) => console.error('MongoDB connection error:', err));

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, { timestamps: true }); 


module.exports = mongoose.model('Expense', expenseSchema);