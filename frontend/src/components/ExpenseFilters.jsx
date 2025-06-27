import React, { useState } from 'react';
import categories from '../utils/categories';
import { format } from 'date-fns';

const ExpenseFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: '',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    searchQuery: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clean empty filters before applying
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    onFilter(cleanedFilters);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
      searchQuery: ''
    });
    onFilter({});
  };

  return (
    <div className="filters-container card">
      <h3>Filter Expenses</h3>
      <form onSubmit={handleSubmit}>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Amount Range</label>
            <div className="amount-range">
              <input
                type="number"
                name="minAmount"
                placeholder="Min"
                value={filters.minAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
              <span>to</span>
              <input
                type="number"
                name="maxAmount"
                placeholder="Max"
                value={filters.maxAmount}
                onChange={handleChange}
                min={filters.minAmount || '0'}
                step="0.01"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-range">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                max={filters.endDate || format(new Date(), 'yyyy-MM-dd')}
              />
              <span>to</span>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                min={filters.startDate}
                max={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              name="searchQuery"
              placeholder="Search descriptions..."
              value={filters.searchQuery}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn-primary">
            Apply Filters
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset All
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseFilters;