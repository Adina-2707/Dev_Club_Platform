import { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import '../App.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data || []);
    } catch (err) {
      setError(`Failed to fetch users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    try {
      await usersAPI.create(formData.email, formData.password);
      setFormData({ email: '', password: '' });
      setError(null);
      fetchUsers();
    } catch (err) {
      setError(`Failed to create user: ${err.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await usersAPI.delete(id);
      fetchUsers();
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Users Management</h1>

      {error && <div style={{ color: 'red', marginBottom: '20px', padding: '10px', background: '#ffe0e0' }}>{error}</div>}

      <form onSubmit={handleCreateUser} style={{ marginBottom: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '5px' }}>
        <h2>Create New User</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="user@example.com"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Create User
        </button>
      </form>

      <div>
        <h2>Users List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={fetchUsers} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Refresh Users
        </button>
      </div>
    </div>
  );
}
