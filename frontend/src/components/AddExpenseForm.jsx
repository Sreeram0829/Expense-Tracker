import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import categories from '../utils/categories';

const AddExpenseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: categories[0].name,
    date: new Date().toISOString().split('T')[0],
  });

  const [currencySymbol, setCurrencySymbol] = useState('₹');

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    const currency = settings?.currency || 'INR';
    switch (currency) {
      case 'USD': setCurrencySymbol('$'); break;
      case 'EUR': setCurrencySymbol('€'); break;
      case 'GBP': setCurrencySymbol('£'); break;
      default: setCurrencySymbol('₹');
    }
  }, []);

  const { addExpense } = useExpenses();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await addExpense({
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date)
    });
    if (success) {
      setFormData({
        title: '',
        amount: '',
        category: categories[0].name,
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const selectedCategory = categories.find(c => c.name === formData.category);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount ({currencySymbol})</label>
          <input
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="category-select-wrapper">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                borderLeft: `5px solid ${selectedCategory.color}`,
                paddingLeft: '10px'
              }}
            >
              {categories.map(cat => (
                <option
                  key={cat.id}
                  value={cat.name}
                  style={{ color: cat.color }}
                >
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            <span
              className="category-icon"
              style={{ color: selectedCategory.color }}
            >
              {selectedCategory.icon}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>

      <div className="expense-tip">
        <p><strong>💡 Quick Tip:</strong> Log your daily spending here to keep track of your finances.</p>
        <ul>
          <li>📝 Title: What you spent on</li>
          <li>💰 Amount: How much you spent</li>
          <li>📂 Category: Food, Travel, Shopping, etc.</li>
          <li>📅 Date: When the expense occurred</li>
          <li>🌙 Dark Mode: Toggle between light & dark themes</li>
          <li>🔒 Authentication: Secure your data (log in/out)</li>
          <li>📊 Reports: Check detailed charts under “Reports”</li>
        </ul>
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'gray' }}>
          Stay consistent with logging your expenses daily for the most accurate insights.  
          Use the “Reports” tab to analyze trends and make informed budgeting decisions!
        </p>
      </div>
    </div>
  );
};

export default AddExpenseForm;
