import React from 'react';

export default function AdminOrdersTab({ orders }) {
  return (
    <div className="admin-panel">
      <h3 style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>GLOBAL PLATFORM ORDERS</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(244, 63, 94, 0.3)', color: '#8492a6' }}>
            <th style={{ padding: '0.65rem' }}>ORDER ID</th>
            <th style={{ padding: '0.65rem' }}>USER ID</th>
            <th style={{ padding: '0.65rem' }}>AMOUNT</th>
            <th style={{ padding: '0.65rem' }}>STATUS</th>
            <th style={{ padding: '0.65rem' }}>TIMESTAMP</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '0.65rem', color: '#f43f5e' }}>#{o.id}</td>
              <td style={{ padding: '0.65rem' }}>User #{o.user_id}</td>
              <td style={{ padding: '0.65rem', color: '#10b981', fontWeight: 700 }}>${o.total_amount.toFixed(2)}</td>
              <td style={{ padding: '0.65rem' }}>
                <span style={{ border: '1px solid #10b981', color: '#10b981', padding: '2px 6px', fontSize: '0.65rem' }}>{o.status}</span>
              </td>
              <td style={{ padding: '0.65rem', color: '#8492a6' }}>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
