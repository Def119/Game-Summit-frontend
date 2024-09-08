import React, { useState } from 'react';
import './ManageUsers.css'; // Make sure to include your styling if needed

function ManageUsers() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Function to search users
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    }
  };

  // Function to delete a user
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username or email"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
