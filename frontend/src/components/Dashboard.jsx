import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseChart from './ExpenseChart';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <div className="welcome-card card">
        <h2>Welcome to QuantumExpense 👋</h2>
        <p>
          Manage your personal finances easily. Add daily expenses, and view your monthly or weekly spending insights.
          Use the charts to understand how you spend your money.
        </p>
        <p><em>Track smarter. Spend better.</em></p>
        <ul>
          <li>➕ Add new expenses instantly</li>
          <li>📊 Visualize category-wise spending</li>
          <li>📅 Compare weekly and monthly trends</li>
        </ul>
      </div>

      {/* Form and Chart */}
      <div className="grid-container">
        <section className="form-section card">
          <h2 className="section-title">Add New Expense</h2>
          <AddExpenseForm />
        </section>

        <section className="chart-section card">
          <h2 className="section-title">Spending Overview</h2>
          <ExpenseChart />
        </section>
      </div>

      {/* Expense List */}
      <section className="list-section card">
        <h2 className="section-title">Expense List</h2>
        <ExpenseList />
      </section>
    </div>
  );
};

export default Dashboard;
