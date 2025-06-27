const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      user: req.user._id  
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: 1});
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found or unauthorized' });
    }

    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found or unauthorized' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
