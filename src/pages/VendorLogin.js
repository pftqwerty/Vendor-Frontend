import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Reset previous error message

    try {
      // Send request to backend API for login
      const response = await axios.post('http://localhost:5000/api/vendors/login', { email, password });

      if (response.data.token) {
        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.token);

        // Successfully logged in, redirect to the dashboard
        navigate('/vendor-dashboard');
      }
    } catch (err) {
      // Handle different error scenarios
      if (err.response) {
        // Server responded with a status outside the 2xx range
        setError(err.response.data.message || 'Invalid credentials. Please try again.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h1 className="text-center mb-4">Vendor Login</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          No account? <a href="/vendor-signup">Sign up here!</a>
        </p>
      </div>
    </div>
  );
};

export default VendorLogin;
