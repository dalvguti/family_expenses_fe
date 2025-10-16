import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Mobile menu button */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo">
          <h2>💰 Family Expenses</h2>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''} onClick={closeSidebar}>
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/expenses" className={isActive('/expenses') ? 'active' : ''} onClick={closeSidebar}>
              📝 Expenses
            </Link>
          </li>
          <li>
            <Link to="/categories" className={isActive('/categories') ? 'active' : ''} onClick={closeSidebar}>
              🏷️ Categories
            </Link>
          </li>
          <li>
            <Link to="/users" className={isActive('/users') ? 'active' : ''} onClick={closeSidebar}>
              👥 Members
            </Link>
          </li>
          <li>
            <Link to="/reports" className={isActive('/reports') ? 'active' : ''} onClick={closeSidebar}>
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

