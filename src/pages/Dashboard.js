import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalExpenses: 0,
    currentMonthTotal: 0,
    expensesByCategory: [],
    recentExpenses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const [statsData, expenses] = await Promise.all([
        apiService.getExpenseStats(),
        apiService.getExpenses({ limit: 5, sort: '-createdAt' }),
      ]);

      setStats({
        totalExpenses: statsData.total || 0,
        currentMonthTotal: statsData.currentMonth || 0,
        expensesByCategory: statsData.byCategory || [],
        recentExpenses: expenses.data || [],
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Family Expense Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">${stats.totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>This Month</h3>
          <p className="stat-value">${stats.currentMonthTotal.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Categories</h3>
          <p className="stat-value">{stats.expensesByCategory.length}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Recent Expenses</h2>
          {stats.recentExpenses.length > 0 ? (
            <ul className="expense-list">
              {stats.recentExpenses.map((expense) => (
                <li key={expense.id} className="expense-item">
                  <div className="expense-info">
                    <span className="expense-desc">{expense.description}</span>
                    <span className="expense-category">{expense.category}</span>
                  </div>
                  <div className="expense-meta">
                    <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                    <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses recorded yet.</p>
          )}
          <Link to="/expenses" className="view-all-link">View All Expenses →</Link>
        </div>

        <div className="section">
          <h2>By Category</h2>
          {stats.expensesByCategory.length > 0 ? (
            <ul className="category-list">
              {stats.expensesByCategory.map((cat, index) => (
                <li key={index} className="category-item">
                  <span className="category-name">{cat.category}</span>
                  <span className="category-amount">${cat.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No category data available.</p>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/expenses/new" className="btn btn-primary">Add New Expense</Link>
        <Link to="/reports" className="btn btn-secondary">View Reports</Link>
      </div>
    </div>
  );
};

export default Dashboard;

