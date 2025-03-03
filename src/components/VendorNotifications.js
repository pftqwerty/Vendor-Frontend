import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';

const VendorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: token },
      });
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.isRead).length);
    } catch (error) {
      toast.error('Error fetching notifications');
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/notifications/${id}`, {}, {
        headers: { Authorization: token },
      });
      fetchNotifications();
    } catch (error) {
      toast.error('Error marking notification as read');
    }
  };

  return (
    <div className="dropdown">
      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <FaBell /> {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {notifications.length === 0 ? (
          <li className="dropdown-item text-muted">No notifications</li>
        ) : (
          notifications.map((notification) => (
            <li key={notification._id} className={`dropdown-item ${notification.isRead ? '' : 'fw-bold'}`} onClick={() => markAsRead(notification._id)}>
              {notification.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VendorNotifications;
