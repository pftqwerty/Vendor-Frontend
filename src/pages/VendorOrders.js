import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaSync } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: token },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus }, {
        headers: { Authorization: token },
      });
      setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
      toast.success(`Order ${id} updated to ${newStatus}`);
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  const filteredOrders = orders.filter(order => 
    (filter === 'All' || order.status === filter) &&
    (order.customerName.toLowerCase().includes(search.toLowerCase()) || order._id.includes(search))
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center">Order Management</h1>
      
      {/* Filters & Search */}
      <div className="d-flex justify-content-between mb-3">
        <select className="form-select w-25" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Orders</option>
          <option value="Received">Received</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
        </select>
        <input type="text" placeholder="Search by Customer or Order ID" className="form-control w-50" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Orders Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total (₱)</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customerName}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} x {item.quantity}</li>
                  ))}
                </ul>
              </td>
              <td>₱{order.totalAmount ? order.totalAmount.toFixed(2) : 0}</td>
              <td>{order.pickupTime}</td>
              <td><span className="badge bg-info">{order.status}</span></td>
              <td>
                {order.status === 'Received' && (
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleStatusUpdate(order._id, 'Preparing')}>
                    <FaSync /> Preparing
                  </button>
                )}
                {order.status === 'Preparing' && (
                  <button className="btn btn-success btn-sm" onClick={() => handleStatusUpdate(order._id, 'Ready for Pickup')}>
                    <FaCheck /> Ready
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorOrders;
