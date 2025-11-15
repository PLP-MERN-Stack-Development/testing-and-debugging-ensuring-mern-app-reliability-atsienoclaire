import React, { useState } from 'react';
import api from '../api/axios'; // your axios instance
import Button from './Button';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      return setError('Email and password are required');
    }

    try {
      // Correct API route to match your Express server
      const res = await api.post('/api/auth/login', { email, password });

      // Save token to localStorage
      const { token } = res.data;
      localStorage.setItem('token', token);

      // Callback to parent to indicate login success
      if (onLoginSuccess) onLoginSuccess(token);

      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 404) {
        setError('Server route not found. Make sure the backend is running.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <Button type="submit">Login</Button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>
  );
};

export default Login;
