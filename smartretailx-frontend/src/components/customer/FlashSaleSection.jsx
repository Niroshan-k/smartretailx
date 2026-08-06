import React from 'react';
import { Plus } from 'lucide-react';

export default function FlashSaleSection({ products, onAddToCart, onRefresh }) {
  return (
    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 2, marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f57224' }}>Flash Sale</h2>
          <span style={{ fontSize: '0.8rem', color: '#757575', fontWeight: 500 }}>On Sale Now</span>
        </div>
        <button style={{ background: '#ffffff', color: '#f57224', border: '1px solid #f57224', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: 2, cursor: 'pointer' }} onClick={onRefresh}>
          SHOP ALL PRODUCTS
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
        {products.slice(0, 6).map((p) => (
          <div key={p.id} className="daraz-card">
            <img src={p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} alt={p.name} className="daraz-card-img" />
            <div className="daraz-card-body">
              <div className="daraz-card-title">{p.name}</div>
              <div>
                <div className="daraz-price">${p.price.toFixed(2)}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="daraz-original-price">${(p.price * 1.3).toFixed(2)}</span>
                  <span className="daraz-discount">-30%</span>
                </div>
              </div>
              <button className="daraz-btn-orange" onClick={() => onAddToCart(p)}>
                <Plus size={14} /> ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
