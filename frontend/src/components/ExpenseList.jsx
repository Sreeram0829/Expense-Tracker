import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatDate, formatCurrency } from '../utils/helpers';
import categories from '../utils/categories';
import ExpenseFilters from './ExpenseFilters';

const ExpenseList = () => {
  const { expenses, loading, error, deleteExpense } = useExpenses();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [activeFilters, setActiveFilters] = useState({});

  const sortedExpenses = React.useMemo(() => {
    let filteredItems = [...expenses];
    
    if (activeFilters.category) {
      filteredItems = filteredItems.filter(exp => exp.category === activeFilters.category);
    }
    if (activeFilters.minAmount) {
      filteredItems = filteredItems.filter(exp => exp.amount >= parseFloat(activeFilters.minAmount));
    }
    if (activeFilters.maxAmount) {
      filteredItems = filteredItems.filter(exp => exp.amount <= parseFloat(activeFilters.maxAmount));
    }
    if (activeFilters.startDate) {
      filteredItems = filteredItems.filter(exp => new Date(exp.date) >= new Date(activeFilters.startDate));
    }
    if (activeFilters.endDate) {
      filteredItems = filteredItems.filter(exp => new Date(exp.date) <= new Date(activeFilters.endDate));
    }
    if (activeFilters.searchQuery) {
      const query = activeFilters.searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(exp => exp.title.toLowerCase().includes(query));
    }

    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }
        if (sortConfig.key === 'amount') {
          return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredItems;
  }, [expenses, sortConfig, activeFilters]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (loading) return <div className="loading">Loading expenses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="expense-list-container">
      <ExpenseFilters onFilter={setActiveFilters} />
      <div className="card">
        <div className="list-header">
          <h2>Expense List</h2>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('title')}>Title</th>
                <th onClick={() => requestSort('amount')}>Amount</th>
                <th onClick={() => requestSort('category')}>Category</th>
                <th onClick={() => requestSort('date')}>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.length > 0 ? (
                sortedExpenses.map((expense) => {
                  const categoryData = categories.find(c => c.name === expense.category);
                  return (
                    <tr key={expense._id}>
                      <td>{expense.title}</td>
                      <td>{formatCurrency(expense.amount)}</td>
                      <td>
                        <span className="category-badge" style={{ backgroundColor: `${categoryData?.color}20`, color: categoryData?.color }}>
                          {categoryData?.icon} {expense.category}
                        </span>
                      </td>
                      <td>{formatDate(expense.date)}</td>
                      <td>
                        <button onClick={() => deleteExpense(expense._id)} className="btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="no-expenses">No expenses recorded yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
