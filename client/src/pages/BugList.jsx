import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Button from '../components/Button';
import BugForm from '../components/BugForm';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState('');

  // Fetch bugs from server
  const fetchBugs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view bugs.');
      return;
    }

    try {
      const res = await api.get('/bugs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBugs(Array.isArray(res.data) ? res.data : []);
      setError('');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to fetch bugs.');
      }
      setBugs([]);
    }
  };

  // Handle new bug creation
  const handleBugCreated = (newBug) => {
    setBugs((prevBugs) => [newBug, ...prevBugs]);
    setError('');
  };

  // Handle deleting a bug
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to delete bugs.');
      return;
    }

    try {
      await api.delete(`/bugs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBugs((prevBugs) => prevBugs.filter((b) => b._id !== id));
      setError('');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to delete bug.');
      }
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Bug Tracker</h2>
      <BugForm onBugCreated={handleBugCreated} />
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
      {bugs.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bugs.map((bug) => (
            <li
              key={bug._id}
              style={{
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd',
                paddingBottom: '6px',
              }}
            >
              <div>
                <strong>{bug.title}</strong> - {bug.status || 'open'}
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(bug._id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bugs reported yet.</p>
      )}
    </div>
  );
};

export default BugList;
