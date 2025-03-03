import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/vendor/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Notifications</h1>
      <div className="card p-4 shadow">
        {notifications.length === 0 ? (
          <p className="text-center">No new notifications</p>
        ) : (
          <ul className="list-group">
            {notifications.map((notification, index) => (
              <li key={index} className="list-group-item">
                {notification.message} - <small>{new Date(notification.date).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VendorNotifications;
