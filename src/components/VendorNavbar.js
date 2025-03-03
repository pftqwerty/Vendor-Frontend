import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VendorNotifications from './VendorNotifications';

const VendorNavbar = ({ theme, toggleTheme }) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/vendor-dashboard">Vendor Panel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/vendor-dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vendor-menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vendor-orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vendor-reports">Reports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vendor-settings">Settings</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            <VendorNotifications />
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link className="btn btn-sm btn-danger" to="/vendor-login" onClick={() => localStorage.removeItem('token')}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VendorNavbar;
