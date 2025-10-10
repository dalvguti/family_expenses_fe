import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import '../styles/ExpenseList.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    paidBy: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await apiService.getExpenses(filters);
      setExpenses(response.data || response);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await apiService.deleteExpense(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
      } catch (err) {
        alert('Failed to delete expense: ' + (err.message || 'Unknown error'));
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      paidBy: '',
      startDate: '',
      endDate: '',
    });
  };

  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  return (
    <div className="expense-list-page">
      <div className="page-header">
        <h1>All Expenses</h1>
        <Link to="/expenses/new" className="btn btn-primary">Add New Expense</Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="Filter by category"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="paidBy">Paid By:</label>
          <input
            type="text"
            id="paidBy"
            name="paidBy"
            value={filters.paidBy}
            onChange={handleFilterChange}
            placeholder="Filter by person"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="startDate">From:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="endDate">To:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        
        <button onClick={clearFilters} className="btn btn-secondary">Clear Filters</button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      {expenses.length > 0 ? (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Paid By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.description}</td>
                <td><span className="category-badge">{expense.category}</span></td>
                <td className="amount">${expense.amount.toFixed(2)}</td>
                <td>{expense.paidBy}</td>
                <td className="actions">
                  <Link to={`/expenses/${expense.id}/edit`} className="btn-edit">Edit</Link>
                  <button onClick={() => handleDelete(expense.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data">
          <p>No expenses found. {filters.category || filters.paidBy ? 'Try adjusting your filters.' : 'Start by adding a new expense!'}</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

