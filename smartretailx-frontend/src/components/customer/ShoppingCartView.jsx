import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function ShoppingCartView({ cart, cartTotal, onRemoveFromCart, onCheckout, onContinueShopping, loading }) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#ffffff', padding: '1.5rem', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' }}>My Shopping Cart</h2>

      {cart.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <ShoppingCart size={48} color="#757575" style={{ marginBottom: '1rem' }} />
          <p style={{ color: '#757575', fontSize: '0.9rem' }}>Your shopping cart is empty.</p>
          <button className="daraz-btn-orange" style={{ width: 'auto', marginTop: '1.25rem', padding: '0.65rem 2rem' }} onClick={onContinueShopping}>
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 2 }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#757575' }}>${item.unit_price.toFixed(2)} x {item.quantity}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f57224' }}>${(item.unit_price * item.quantity).toFixed(2)}</span>
                <button style={{ background: 'none', border: 'none', color: '#757575', cursor: 'pointer' }} onClick={() => onRemoveFromCart(item.product_id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#757575' }}>Total Amount</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f57224' }}>${cartTotal.toFixed(2)}</h3>
            </div>
            <button className="daraz-btn-orange" style={{ width: 'auto', padding: '0.85rem 2.5rem', fontSize: '0.95rem' }} onClick={onCheckout} disabled={loading}>
              {loading ? 'PROCESSING ORDER...' : 'PROCEED TO CHECKOUT'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
