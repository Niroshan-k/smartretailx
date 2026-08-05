import React from 'react';
import { Star, Plus } from 'lucide-react';

export default function ProductCatalogGrid({ products, onAddToCart }) {
  return (
    <div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#212121' }}>Just For You</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
        {products.map((p) => (
          <div key={p.id} className="daraz-card">
            <img src={p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} alt={p.name} className="daraz-card-img" />
            <div className="daraz-card-body">
              <div className="daraz-card-title">{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, margin: '0.2rem 0' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} color="#faca51" fill="#faca51" />
                ))}
                <span style={{ fontSize: '0.7rem', color: '#757575', marginLeft: 4 }}>(80)</span>
              </div>
              <div>
                <div className="daraz-price">${p.price.toFixed(2)}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="daraz-original-price">${(p.price * 1.25).toFixed(2)}</span>
                  <span className="daraz-discount">-25%</span>
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
