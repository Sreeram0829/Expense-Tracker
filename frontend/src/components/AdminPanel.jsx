import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    avgExpense: 0
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/stats')
        ]);
        
        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  if (loading) return <div className="loading">Loading admin data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>{stats.totalExpenses}</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Expense</h3>
          <p>₹{stats.avgExpense.toFixed(2)}</p>
        </div>
      </div>

      <h2>User Management</h2>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn-danger"
                    disabled={user.role === 'admin'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;