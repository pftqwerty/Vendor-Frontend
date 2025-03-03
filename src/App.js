import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VendorLogin from './pages/VendorLogin';
import VendorSignUp from './pages/VendorSignUp';
import VendorDashboard from './pages/VendorDashboard';
import VendorMenu from './pages/VendorMenu';
import VendorOrders from './pages/VendorOrders';
import VendorSettings from './pages/VendorSettings';
import VendorNotifications from './pages/VendorNotifications';
import VendorReports from './pages/VendorReports';
import VendorNavbar from './components/VendorNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {isAuthenticated && <VendorNavbar theme={theme} toggleTheme={toggleTheme} />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/vendor-dashboard" : "/vendor-login"} />} />
          <Route path="/vendor-login" element={<VendorLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/vendor-signup" element={<VendorSignUp />} />
          <Route path="/vendor-dashboard" element={isAuthenticated ? <VendorDashboard /> : <Navigate to="/vendor-login" />} />
          <Route path="/vendor-menu" element={isAuthenticated ? <VendorMenu /> : <Navigate to="/vendor-login" />} />
          <Route path="/vendor-orders" element={isAuthenticated ? <VendorOrders /> : <Navigate to="/vendor-login" />} />
          <Route path="/vendor-settings" element={isAuthenticated ? <VendorSettings /> : <Navigate to="/vendor-login" />} />
          <Route path="/vendor-notifications" element={isAuthenticated ? <VendorNotifications /> : <Navigate to="/vendor-login" />} />
          <Route path="/vendor-reports" element={isAuthenticated ? <VendorReports /> : <Navigate to="/vendor-login" />} />
        </Routes>
        {isAuthenticated && <button className="btn btn-danger mt-3" onClick={logout}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;
