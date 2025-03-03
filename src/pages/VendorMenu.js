import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const VendorMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '', image: null });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/menu', {
          headers: { Authorization: token },
        });
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleFileUpload = (event, isEditing = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          setEditItem({ ...editItem, image: reader.result });
        } else {
          setNewItem({ ...newItem, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      toast.error('Please fill in all fields!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/menu', newItem, {
        headers: { Authorization: token },
      });
      setMenuItems([...menuItems, response.data]);
      setNewItem({ name: '', price: '', category: '', image: null });
      toast.success('Menu item added successfully!');
    } catch (error) {
      toast.error('Error adding menu item');
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/menu/${editItem._id}`, editItem, {
        headers: { Authorization: token },
      });
      setMenuItems(menuItems.map((item) => (item._id === editItem._id ? response.data : item)));
      setEditItem(null);
      toast.success('Menu item updated successfully!');
    } catch (error) {
      toast.error('Error updating menu item');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/menu/${id}`, {
        headers: { Authorization: token },
      });
      setMenuItems(menuItems.filter((item) => item._id !== id));
      toast.info('Menu item deleted.');
    } catch (error) {
      toast.error('Error deleting menu item');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Vendor Menu Management</h1>
      <div className="mb-4">
        <h3>{editItem ? 'Edit Item' : 'Add New Item'}</h3>
        <input type="text" placeholder="Item Name" className="form-control mb-2"
          value={editItem ? editItem.name : newItem.name}
          onChange={(e) => editItem ? setEditItem({ ...editItem, name: e.target.value }) : setNewItem({ ...newItem, name: e.target.value })} />
        <input type="number" placeholder="Price" className="form-control mb-2"
          value={editItem ? editItem.price : newItem.price}
          onChange={(e) => editItem ? setEditItem({ ...editItem, price: e.target.value }) : setNewItem({ ...newItem, price: e.target.value })} />
        <input type="text" placeholder="Category" className="form-control mb-2"
          value={editItem ? editItem.category : newItem.category}
          onChange={(e) => editItem ? setEditItem({ ...editItem, category: e.target.value }) : setNewItem({ ...newItem, category: e.target.value })} />
        <input type="file" className="form-control mb-2" accept="image/*" onChange={(e) => handleFileUpload(e, !!editItem)} />
        {editItem ? (
          <button className="btn btn-warning w-100" onClick={handleSaveEdit}>Save Changes</button>
        ) : (
          <button className="btn btn-success w-100" onClick={handleAddItem}>Add Item</button>
        )}
      </div>

      <h3>Current Menu</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₱)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.image ? <img src={item.image} alt={item.name} className="img-thumbnail" style={{ maxWidth: '100px' }} /> : <FaImage size={30} />}</td>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.category}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleEditClick(item)}><FaEdit /> Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(item._id)}><FaTrash /> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorMenu;
