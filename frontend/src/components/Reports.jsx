import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const { expenses } = useExpenses();
  const [reportData, setReportData] = useState([]);
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [...new Set(expenses.map(exp => exp.category))];

  useEffect(() => {
    const groupedData = {};

    expenses.forEach(exp => {
      const dateObj = new Date(exp.date);
      const month = dateObj.toLocaleString('default', { month: 'short' });
      const year = dateObj.getFullYear();
      const period = `${month} ${year}`;

      if (!groupedData[period]) {
        groupedData[period] = { name: period, total: 0 };
        categories.forEach(cat => groupedData[period][cat] = 0);
      }

      groupedData[period][exp.category] += exp.amount;
      groupedData[period].total += exp.amount;
    });

    const sortedData = Object.values(groupedData).sort((a, b) => {
      const dateA = new Date(a.name + ' 1');
      const dateB = new Date(b.name + ' 1');
      return dateA - dateB;
    });

    setReportData(sortedData);
  }, [expenses, selectedCategory, timeRange]);

  const summaryStats = {
    total: reportData.reduce((sum, item) => sum + item.total, 0),
    average: reportData.length ? (reportData.reduce((sum, item) => sum + item.total, 0) / reportData.length) : 0,
    highest: Math.max(...reportData.map(item => item.total), 0)
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="card">
      <h2>Expense Reports</h2>

      <div className="filter-controls">
        <div className="filter-group">
          <label className="filter-label">Time Range</label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="summary-value">₹{summaryStats.total.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Average per Month</h3>
          <p className="summary-value">₹{summaryStats.average.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Highest Month</h3>
          <p className="summary-value">₹{summaryStats.highest.toLocaleString()}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Expense Trends</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedCategory === 'all' ? (
                categories.map((category, index) => (
                  <Bar key={category} dataKey={category} fill={COLORS[index % COLORS.length]} />
                ))
              ) : (
                <Bar dataKey={selectedCategory} fill={COLORS[0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="expense-details">
        <h3>Detailed Breakdown</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Month</th>
              {selectedCategory === 'all' ? categories.map(cat => <th key={cat}>{cat}</th>) : <th>{selectedCategory}</th>}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                {selectedCategory === 'all' ? (
                  categories.map(cat => <td key={cat}>₹{row[cat].toLocaleString()}</td>)
                ) : (
                  <td>₹{row[selectedCategory].toLocaleString()}</td>
                )}
                <td>₹{row.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
