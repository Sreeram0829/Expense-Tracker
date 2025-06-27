import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import categories from '../utils/categories';

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  const [timeFrame, setTimeFrame] = useState('monthly');

  // Process data for charts
  const processChartData = () => {
    if (!expenses || expenses.length === 0) return {};

    // Category breakdown (for Pie Chart)
    const categoryData = expenses.reduce((acc, expense) => {
      const existingCategory = acc.find(item => item.name === expense.category);
      const categoryInfo = categories.find(c => c.name === expense.category);
      
      if (existingCategory) {
        existingCategory.value += expense.amount;
      } else {
        acc.push({
          name: expense.category,
          value: expense.amount,
          color: categoryInfo?.color || '#8884d8',
          icon: categoryInfo?.icon || '💰'
        });
      }
      return acc;
    }, []);

    // Monthly spending (for Bar Chart)
    const monthlyData = expenses.reduce((acc, expense) => {
      const monthYear = format(parseISO(expense.date), 'MMM yyyy');
      const existingMonth = acc.find(item => item.name === monthYear);
      
      if (existingMonth) {
        existingMonth.total += expense.amount;
      } else {
        acc.push({
          name: monthYear,
          total: expense.amount,
          date: expense.date
        });
      }
      return acc;
    }, []);

    // Sort monthly data chronologically
    monthlyData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Weekly spending (for Bar Chart)
    const now = new Date();
    const twelveWeeksAgo = new Date(now.setDate(now.getDate() - 84));
    const weeklyData = Array(12).fill(0).map((_, i) => {
      const weekStart = new Date(twelveWeeksAgo);
      weekStart.setDate(weekStart.getDate() + (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const weekExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= weekStart && expDate <= weekEnd;
      });
      
      const weekTotal = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      
      return {
        name: `Week ${i+1}`,
        total: weekTotal,
        startDate: weekStart.toISOString(),
        endDate: weekEnd.toISOString()
      };
    });

    return { categoryData, monthlyData, weeklyData };
  };

  const { categoryData = [], monthlyData = [], weeklyData = [] } = processChartData();

  return (
    <div className="charts-container">
      <div className="chart-section card">
        <h2>Spending Breakdown</h2>
        <div className="timeframe-selector">
          <button
            className={timeFrame === 'monthly' ? 'active' : ''}
            onClick={() => setTimeFrame('monthly')}
          >
            Monthly
          </button>
          <button
            className={timeFrame === 'weekly' ? 'active' : ''}
            onClick={() => setTimeFrame('weekly')}
          >
            Weekly
          </button>
        </div>
        
        <div className="chart-row">
          <div className="chart-wrapper">
            <h3>By Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Amount']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-wrapper">
            <h3>{timeFrame === 'monthly' ? 'Monthly' : 'Weekly'} Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={timeFrame === 'monthly' ? monthlyData : weeklyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Total']}
                  labelFormatter={timeFrame === 'monthly' 
                    ? (label) => `Month: ${label}`
                    : (_, payload) => {
                        if (!payload[0]?.payload) return '';
                        const { startDate, endDate } = payload[0].payload;
                        return `${format(new Date(startDate), 'MMM d')} - ${format(new Date(endDate), 'MMM d')}`;
                      }
                  }
                />
                <Bar 
                  dataKey="total" 
                  name="Total Spending" 
                  fill="#4a6fa5" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;