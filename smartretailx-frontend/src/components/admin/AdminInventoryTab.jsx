import React from 'react';

export default function AdminInventoryTab({ inventory }) {
  return (
    <div className="admin-panel">
      <h3 style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>WAREHOUSE INVENTORY STOCK</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(244, 63, 94, 0.3)', color: '#8492a6' }}>
            <th style={{ padding: '0.65rem' }}>PRODUCT ID</th>
            <th style={{ padding: '0.65rem' }}>AVAILABLE STOCK</th>
            <th style={{ padding: '0.65rem' }}>RESERVED STOCK</th>
            <th style={{ padding: '0.65rem' }}>LOCATION</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((i) => (
            <tr key={i.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '0.65rem', color: '#f43f5e' }}>Product #{i.product_id}</td>
              <td style={{ padding: '0.65rem', color: '#06b6d4', fontWeight: 700 }}>{i.available_quantity} units</td>
              <td style={{ padding: '0.65rem' }}>{i.reserved_quantity} units</td>
              <td style={{ padding: '0.65rem' }}>{i.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
