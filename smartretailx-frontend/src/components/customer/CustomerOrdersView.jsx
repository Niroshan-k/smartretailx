import React from 'react';

export default function CustomerOrdersView({ orders }) {
  return (
    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' }}>My Orders</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', background: '#fafafa' }}>
            <th style={{ padding: '0.85rem' }}>ORDER ID</th>
            <th style={{ padding: '0.85rem' }}>TOTAL AMOUNT</th>
            <th style={{ padding: '0.85rem' }}>STATUS</th>
            <th style={{ padding: '0.85rem' }}>SHIPPING ADDRESS</th>
            <th style={{ padding: '0.85rem' }}>DATE & TIME</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#757575' }}>No orders placed yet.</td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.85rem', fontWeight: 700 }}>#{o.id}</td>
                <td style={{ padding: '0.85rem', fontWeight: 700, color: '#f57224' }}>${o.total_amount.toFixed(2)}</td>
                <td style={{ padding: '0.85rem' }}>
                  <span style={{ background: '#eff0f5', color: '#212121', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 700, borderRadius: 2 }}>{o.status}</span>
                </td>
                <td style={{ padding: '0.85rem', color: '#757575' }}>{o.shipping_address}</td>
                <td style={{ padding: '0.85rem', color: '#757575', fontSize: '0.8rem' }}>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
