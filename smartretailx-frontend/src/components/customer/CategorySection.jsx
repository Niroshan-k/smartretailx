import React from 'react';
import { Layers } from 'lucide-react';

export default function CategorySection({ selectedCategory, onSelectCategory }) {
  const categories = ['ALL', 'Electronics', 'Home & Kitchen', 'Fashion', 'Sports'];

  return (
    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 2, marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#212121' }}>Categories</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
        {categories.map((cat) => (
          <div
            key={cat}
            className="daraz-category-tile"
            style={{
              border: selectedCategory === cat ? '1px solid #f57224' : '1px solid #f0f0f0',
              background: selectedCategory === cat ? '#fff5f0' : '#fff'
            }}
            onClick={() => onSelectCategory(cat)}
          >
            <Layers size={24} color={selectedCategory === cat ? '#f57224' : '#757575'} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: selectedCategory === cat ? '#f57224' : '#212121' }}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
