import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VendorSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    contactNumber: '',
    businessHours: '',
    holidayMode: false,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/vendor/profile', {
        headers: { Authorization: token },
      });
      setProfile(response.data);
    } catch (error) {
      toast.error('Error loading profile');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/vendor/profile', profile, {
        headers: { Authorization: token },
      });
      setProfile(response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Vendor Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Restaurant Name</label>
          <input type="text" name="name" className="form-control" value={profile.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input type="text" name="contactNumber" className="form-control" value={profile.contactNumber} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Business Hours</label>
          <input type="text" name="businessHours" className="form-control" value={profile.businessHours} onChange={handleChange} />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="holidayMode" name="holidayMode" checked={profile.holidayMode} onChange={handleChange} />
          <label className="form-check-label" htmlFor="holidayMode">Enable Holiday Mode</label>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default VendorSettings;
