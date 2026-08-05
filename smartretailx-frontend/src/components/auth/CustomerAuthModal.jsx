import React, { useState } from 'react';

export default function CustomerAuthModal({ onLoginSuccess, onRegisterSuccess, loading }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      onLoginSuccess({ email, password });
    } else {
      onRegisterSuccess({ email, password, fullName });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', color: '#212121', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 4, padding: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #f57224', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f57224', letterSpacing: '-0.02em' }}>
            Smart<span style={{ color: '#212121' }}>RetailX</span>
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#757575', marginTop: 4 }}>CLOUD COMMERCE PLATFORM</p>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: mode === 'login' ? '2px solid #f57224' : 'none', color: mode === 'login' ? '#f57224' : '#757575', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: mode === 'register' ? '2px solid #f57224' : 'none', color: mode === 'register' ? '#f57224' : '#757575', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>FULL NAME</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 2, outline: 'none', fontSize: '0.85rem' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@domain.com"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 2, outline: 'none', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 2, outline: 'none', fontSize: '0.85rem' }}
            />
          </div>

          <button type="submit" disabled={loading} className="daraz-btn-orange" style={{ padding: '0.85rem', borderRadius: 2 }}>
            {loading ? 'PROCESSING...' : mode === 'login' ? 'SIGN IN AS CUSTOMER' : 'CREATE CUSTOMER ACCOUNT'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <a href="/admin/login" style={{ color: '#757575', fontSize: '0.75rem', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/admin/login'); window.location.reload(); }}>
            Go to Admin Portal →
          </a>
        </div>

      </div>
    </div>
  );
}
