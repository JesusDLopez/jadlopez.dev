// src/PasswordGate.jsx
import { useState, useEffect } from 'react';

export default function PasswordGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if already unlocked in this session
  useEffect(() => {
    const unlocked = sessionStorage.getItem('portfolio_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set your password here (or use env variable)
    const correctPassword = import.meta.env.VITE_ACCESS_PASSWORD;
    if (!correctPassword) {
      setError('Access temporarily disabled. Please check back soon.');
      setPassword('');
      return;
    }

    if (password === correctPassword) {
      setIsUnlocked(true);
      sessionStorage.setItem('portfolio_unlocked', 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isUnlocked) {
    return children;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 100%)',
      color: '#e2e8f0'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '3rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
          🧬 Portfolio Access
        </h1>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          This portfolio is currently in development. Enter password to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#e2e8f0',
              fontSize: '1rem'
            }}
          />
          {error && (
            <p style={{ color: '#f87171', marginBottom: '1rem' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: '#06b6d4',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Unlock Portfolio
          </button>
        </form>
        <p style={{
          marginTop: '2rem',
          fontSize: '0.875rem',
          opacity: 0.6,
          textAlign: 'center'
        }}>
          Need access? Contact me at jlopezorourke@gmail.com
        </p>
      </div>
    </div>
  );
}
