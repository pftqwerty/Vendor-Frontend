import React from 'react';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Vendor Dashboard</h1>
      <p className="text-center">Manage your restaurant operations.</p>

      <div className="text-center mt-4">
        <Link to="/vendor-menu" className="btn btn-primary">
          Manage Menu
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;
