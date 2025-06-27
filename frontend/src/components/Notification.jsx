import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

const Notification = () => {
  const { notification } = useExpenses();

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notification;