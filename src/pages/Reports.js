import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import '../styles/Reports.css';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - i);

  useEffect(() => {
    fetchReport();
  }, [selectedYear, selectedMonth]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await apiService.getMonthlyReport(selectedYear, selectedMonth);
      setReportData(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!reportData) return;
    
    // Simple CSV export
    const csvContent = [
      ['Description', 'Category', 'Amount', 'Paid By', 'Date'],
      ...(reportData.expenses || []).map(exp => [
        exp.description,
        exp.category,
        exp.amount,
        exp.paidBy,
        exp.date
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-report-${selectedYear}-${selectedMonth}.csv`;
    a.click();
  };

  if (loading) {
    return <div className="loading">Loading report...</div>;
  }

  return (
    <div className="reports-page">
      <h1>Monthly Reports</h1>

      <div className="report-controls">
        <div className="control-group">
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>

        <button onClick={handleExport} className="btn btn-primary" disabled={!reportData}>
          Export CSV
        </button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      {reportData && (
        <div className="report-content">
          <div className="report-summary">
            <h2>Summary for {months[selectedMonth - 1]} {selectedYear}</h2>
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Expenses</h3>
                <p className="summary-value">${(reportData.total || 0).toFixed(2)}</p>
              </div>
              <div className="summary-card">
                <h3>Number of Transactions</h3>
                <p className="summary-value">{reportData.count || 0}</p>
              </div>
              <div className="summary-card">
                <h3>Average per Transaction</h3>
                <p className="summary-value">
                  ${reportData.count ? (reportData.total / reportData.count).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="report-breakdown">
            <h3>By Category</h3>
            {reportData.byCategory && reportData.byCategory.length > 0 ? (
              <table className="breakdown-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.byCategory.map((item, index) => (
                    <tr key={index}>
                      <td>{item.category}</td>
                      <td>${item.total.toFixed(2)}</td>
                      <td>{((item.total / reportData.total) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No category data available</p>
            )}
          </div>

          <div className="report-breakdown">
            <h3>By Person</h3>
            {reportData.byPerson && reportData.byPerson.length > 0 ? (
              <table className="breakdown-table">
                <thead>
                  <tr>
                    <th>Person</th>
                    <th>Amount</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.byPerson.map((item, index) => (
                    <tr key={index}>
                      <td>{item.paidBy}</td>
                      <td>${item.total.toFixed(2)}</td>
                      <td>{((item.total / reportData.total) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No person data available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;

