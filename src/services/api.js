import axios from 'axios';

// Base API URL - update this based on your backend configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
//const API_BASE_URL = 'https://family-expenses-api.gutilopsa.com/api';
/**
 * API Service Class
 * Handles all HTTP requests to the backend
 */
class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth token if needed
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic HTTP methods
  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.client.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Expense endpoints
  async getExpenses(filters = {}) {
    return this.get('/expenses', filters);
  }

  async getExpenseById(id) {
    return this.get(`/expenses/${id}`);
  }

  async createExpense(expenseData) {
    return this.post('/expenses', expenseData);
  }

  async updateExpense(id, expenseData) {
    return this.put(`/expenses/${id}`, expenseData);
  }

  async deleteExpense(id) {
    return this.delete(`/expenses/${id}`);
  }

  // User endpoints
  async getUsers() {
    return this.get('/users');
  }

  async getUserById(id) {
    return this.get(`/users/${id}`);
  }

  async createUser(userData) {
    return this.post('/users', userData);
  }

  async updateUser(id, userData) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return this.delete(`/users/${id}`);
  }

  // Category endpoints
  async getCategories(filters = {}) {
    return this.get('/categories', filters);
  }

  async getCategoryById(id) {
    return this.get(`/categories/${id}`);
  }

  async createCategory(categoryData) {
    return this.post('/categories', categoryData);
  }

  async updateCategory(id, categoryData) {
    return this.put(`/categories/${id}`, categoryData);
  }

  async deleteCategory(id) {
    return this.delete(`/categories/${id}`);
  }

  async toggleCategoryStatus(id) {
    return this.client.patch(`/categories/${id}/toggle`).then(res => res.data);
  }

  // Statistics endpoints
  async getExpenseStats(filters = {}) {
    return this.get('/expenses/stats', filters);
  }

  async getMonthlyReport(year, month) {
    return this.get('/reports/monthly', { year, month });
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'No response from server. Please check your connection.',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1,
      };
    }
  }
}

// Export singleton instance
export default new ApiService();

