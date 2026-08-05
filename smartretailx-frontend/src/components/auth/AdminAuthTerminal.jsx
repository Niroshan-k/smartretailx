import React, { useState } from 'react';
import { ShieldCheck, Terminal } from 'lucide-react';

export default function AdminAuthTerminal({ onAdminLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdminLogin({ email, password });
  };

  return (
    <div className="admin-telemetry-app" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100vw' }}>
      <div className="admin-panel" style={{ width: '100%', maxWidth: 440, padding: '2.5rem', border: '1px solid #f43f5e', background: '#0b0d13', boxShadow: '0 0 30px rgba(244, 63, 94, 0.2)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(244, 63, 94, 0.3)', paddingBottom: '1rem' }}>
          <ShieldCheck color="#f43f5e" size={32} />
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.15em', color: '#fff' }}>SMARTRETAILX</h1>
            <p style={{ fontSize: '0.65rem', color: '#f43f5e', letterSpacing: '0.1em' }}>RESTRICTED ADMIN TELEMETRY PORTAL</p>
          </div>
        </div>

        <div style={{ background: '#11131a', border: '1px solid rgba(244,63,94,0.3)', padding: '0.85rem', marginBottom: '1.5rem', fontSize: '0.75rem', color: '#8492a6', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f43f5e', fontWeight: 700, marginBottom: 4 }}>
            <Terminal size={14} /> SECURITY UPLINK ROUTE: /admin/login
          </div>
          Authorized System Administrators Only. All uplink attempts are logged for security auditing.
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: '#8492a6', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>ADMINISTRATOR EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@smartretailx.com"
              style={{ width: '100%', padding: '0.75rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontSize: '0.85rem', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: '#8492a6', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>ACCESS SECURITY KEY</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontSize: '0.85rem', fontFamily: 'inherit' }}
            />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.85rem', background: '#f43f5e', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit' }}>
            {loading ? 'AUTHENTICATING UPLINK...' : 'INITIALIZE ADMIN UPLINK'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
          <a href="/" style={{ color: '#8492a6', fontSize: '0.75rem', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.location.reload(); }}>
            ← Return to Customer Portal
          </a>
        </div>
      </div>
    </div>
  );
}
