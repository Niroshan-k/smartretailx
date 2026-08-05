import React from 'react';
import { Plus, Eye } from 'lucide-react';

export default function AdminProductsTab({ products, onOpenAddModal, onPreviewImage }) {
  return (
    <div className="admin-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.9rem' }}>CATALOG PRODUCTS MANAGEMENT</h3>
        <button className="admin-btn-red" style={{ padding: '0.4rem 0.8rem', fontSize: '0.65rem' }} onClick={onOpenAddModal}>
          <Plus size={12} /> ADD PRODUCT
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(244, 63, 94, 0.3)', color: '#8492a6' }}>
            <th style={{ padding: '0.65rem' }}>IMAGE</th>
            <th style={{ padding: '0.65rem' }}>ID</th>
            <th style={{ padding: '0.65rem' }}>SKU</th>
            <th style={{ padding: '0.65rem' }}>NAME</th>
            <th style={{ padding: '0.65rem' }}>CATEGORY</th>
            <th style={{ padding: '0.65rem' }}>PRICE</th>
            <th style={{ padding: '0.65rem' }}>PREVIEW</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const imgUrl = p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500';
            return (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.65rem' }}>
                  <img
                    src={imgUrl}
                    alt={p.name}
                    style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 2, cursor: 'pointer', border: '1px solid rgba(244,63,94,0.4)' }}
                    onClick={() => onPreviewImage(imgUrl)}
                  />
                </td>
                <td style={{ padding: '0.65rem', color: '#f43f5e' }}>#{p.id}</td>
                <td style={{ padding: '0.65rem' }}>{p.sku}</td>
                <td style={{ padding: '0.65rem', color: '#fff', fontWeight: 700 }}>{p.name}</td>
                <td style={{ padding: '0.65rem' }}>{p.category}</td>
                <td style={{ padding: '0.65rem', color: '#10b981', fontWeight: 700 }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: '0.65rem' }}>
                  <button
                    style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#8492a6', padding: '0.2rem 0.5rem', fontSize: '0.65rem', cursor: 'pointer', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    onClick={() => onPreviewImage(imgUrl)}
                  >
                    <Eye size={12} /> PREVIEW
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
