import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="logo">
          <h2>💰 Family Expenses</h2>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''}>
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/expenses" className={isActive('/expenses') ? 'active' : ''}>
              📝 Expenses
            </Link>
          </li>
          <li>
            <Link to="/categories" className={isActive('/categories') ? 'active' : ''}>
              🏷️ Categories
            </Link>
          </li>
          <li>
            <Link to="/users" className={isActive('/users') ? 'active' : ''}>
              👥 Members
            </Link>
          </li>
          <li>
            <Link to="/reports" className={isActive('/reports') ? 'active' : ''}>
              📈 Reports
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

