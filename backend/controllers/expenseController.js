const Expense = require('../models/Expense');

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getExpenses, addExpense, deleteExpense };
