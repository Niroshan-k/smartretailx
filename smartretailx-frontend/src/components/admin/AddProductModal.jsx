import React, { useState } from 'react';

export default function AddProductModal({ isOpen, onClose, onCreateProduct }) {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProduct({
      sku,
      name,
      price: parseFloat(price),
      category,
      description: desc,
      image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    });
    setSku(''); setName(''); setPrice(''); setCategory('Electronics'); setDesc(''); setImageUrl('');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
      <div className="admin-panel" style={{ width: 440 }}>
        <h3 style={{ marginBottom: '1.25rem', color: '#f43f5e', fontSize: '0.9rem' }}>ADD NEW CATALOG PRODUCT</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>SKU</label>
            <input type="text" required value={sku} onChange={(e) => setSku(e.target.value)} placeholder="ELEC-MONITOR-01" style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
          </div>
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>PRODUCT NAME</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="4K Gaming Monitor" style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
          </div>
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>IMAGE URL</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/photo-..." style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
          </div>
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>PRICE ($)</label>
            <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="599.99" style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
          </div>
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>CATEGORY</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }}>
              <option value="Electronics">Electronics</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Fashion">Fashion</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>DESCRIPTION</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Product description..." style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" style={{ flex: 1, background: 'none', color: '#8492a6', border: '1px solid #8492a6', padding: '0.5rem', fontFamily: 'inherit', fontSize: '0.7rem', cursor: 'pointer' }} onClick={onClose}>CANCEL</button>
            <button type="submit" style={{ flex: 1, background: '#f43f5e', color: '#fff', border: 'none', padding: '0.5rem', fontFamily: 'inherit', fontSize: '0.7rem', cursor: 'pointer' }}>SAVE PRODUCT</button>
          </div>
        </form>
      </div>
    </div>
  );
}
