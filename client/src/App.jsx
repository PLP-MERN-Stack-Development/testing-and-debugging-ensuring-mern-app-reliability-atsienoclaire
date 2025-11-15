import React, { useState, useEffect } from 'react';
import BugList from './pages/BugList';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  // Called when login is successful
  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>MERN Bug Tracker</h1>

      {isAuthenticated ? (
        <>
          <button
            onClick={handleLogout}
            style={{
              marginBottom: '20px',
              padding: '6px 12px',
              cursor: 'pointer',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Logout
          </button>
          <ErrorBoundary>
            <BugList />
          </ErrorBoundary>
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
