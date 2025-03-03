import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const VendorReports = () => {
  const [salesData, setSalesData] = useState({});
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    fetchSalesData('weekly'); // Default to weekly sales
    fetchTopItems();
  }, []);

  const fetchSalesData = async (period) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/reports/sales?period=${period}`, {
        headers: { Authorization: token },
      });
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchTopItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/reports/top-items', {
        headers: { Authorization: token },
      });
      setTopItems(response.data);
    } catch (error) {
      console.error('Error fetching top items:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Reports & Analytics</h1>
      
      {/* Sales Reports */}
      <div className="mb-4">
        <h3>Sales Summary</h3>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => fetchSalesData('daily')}>Daily</button>
          <button className="btn btn-secondary" onClick={() => fetchSalesData('weekly')}>Weekly</button>
          <button className="btn btn-success" onClick={() => fetchSalesData('monthly')}>Monthly</button>
        </div>
        <div className="mt-3">
          <h4>Total Sales: ₱{salesData.totalSales || 0}</h4>
          <h4>Total Orders: {salesData.totalOrders || 0}</h4>
        </div>
      </div>

      {/* Sales Bar Chart */}
      <div className="mb-4">
        <h3>Sales Chart</h3>
        <Bar
          data={{
            labels: ['Daily', 'Weekly', 'Monthly'],
            datasets: [{
              label: 'Sales (₱)',
              data: [salesData.totalSales || 0, salesData.totalOrders || 0],
              backgroundColor: ['#007bff', '#28a745', '#dc3545'],
            }]
          }}
        />
      </div>

      {/* Most Ordered Items */}
      <div>
        <h3>Top 5 Most Ordered Items</h3>
        <Pie
          data={{
            labels: topItems.map(item => item.name),
            datasets: [{
              data: topItems.map(item => item.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
            }]
          }}
        />
      </div>
    </div>
  );
};

export default VendorReports;
