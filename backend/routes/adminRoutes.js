const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Expense = require('../models/Expense');

// Get all users (admin only)
router.get('/users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, 'email role createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get admin stats
router.get('/stats', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalExpenses = await Expense.countDocuments();
    const avgExpense = await Expense.aggregate([
      { $group: { _id: null, avg: { $avg: "$amount" } } }
    ]);
    
    res.json({
      totalUsers,
      totalExpenses,
      avgExpense: avgExpense[0]?.avg || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }
    
    await Expense.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;