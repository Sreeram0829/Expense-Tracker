const express = require('express');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');

const router = express.Router();

router.get('/', getExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
