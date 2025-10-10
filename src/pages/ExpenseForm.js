import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api';
import Expense from '../models/Expense';
import '../styles/ExpenseForm.css';

const ExpenseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paidBy: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
    if (isEditMode) {
      fetchExpense();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories({ isActive: 'true' });
      setCategories(response.data || response);
    } catch (err) {
      console.error('Failed to load categories:', err);
      // Set default categories as fallback
      setCategories([
        { id: 1, name: 'Groceries' },
        { id: 2, name: 'Utilities' },
        { id: 3, name: 'Transportation' },
        { id: 4, name: 'Entertainment' },
        { id: 5, name: 'Other' },
      ]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiService.getUsers();
      setUsers(response.data || response);
    } catch (err) {
      console.error('Failed to load users:', err);
      setUsers([]);
    }
  };

  const fetchExpense = async () => {
    try {
      setLoading(true);
      const data = await apiService.getExpenseById(id);
      setFormData({
        description: data.description || '',
        amount: data.amount || '',
        category: data.category || '',
        date: data.date || '',
        paidBy: data.paidBy || '',
      });
    } catch (err) {
      setError('Failed to load expense details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const expense = new Expense({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    if (!expense.isValid()) {
      setError('Please fill in all required fields correctly');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditMode) {
        await apiService.updateExpense(id, expense.toJSON());
      } else {
        await apiService.createExpense(expense.toJSON());
      }

      navigate('/expenses');
    } catch (err) {
      setError(err.message || 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="loading">Loading expense...</div>;
  }

  return (
    <div className="expense-form-page">
      <h1>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter expense description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id || cat} value={cat.name || cat}>
                  {cat.icon ? `${cat.icon} ` : ''}{cat.name || cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="paidBy">Paid By *</label>
            <select
              id="paidBy"
              name="paidBy"
              value={formData.paidBy}
              onChange={handleChange}
              required
            >
              <option value="">Select who paid</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Expense' : 'Add Expense')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/expenses')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;

