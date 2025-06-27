import React, { createContext, useContext, useState, useEffect } from 'react';
import { getExpenses, addExpense, deleteExpense } from '../services/expenseService';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);
      setExpenses(prev => [...prev, newExpense]);
      showNotification('Expense added successfully!', 'success');
      return true;
    } catch (err) {
      showNotification(err.message, 'error');
      return false;
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
      showNotification('Expense deleted successfully!', 'success');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        notification,
        addExpense: handleAddExpense,
        deleteExpense: handleDeleteExpense,
        fetchExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);