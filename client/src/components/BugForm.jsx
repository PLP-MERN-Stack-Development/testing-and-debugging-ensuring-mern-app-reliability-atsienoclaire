import React, { useState } from 'react';
import api from '../api/axios';
import Button from './Button';

const BugForm = ({ onBugCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to report a bug.');
      return;
    }

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const res = await api.post(
        '/bugs',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onBugCreated(res.data);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to create bug');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <Button type="submit">Report Bug</Button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>
  );
};

export default BugForm;
