import React from 'react';
import { ShoppingBag, Search, ShoppingCart } from 'lucide-react';

export default function CustomerHeader({
  searchQuery,
  setSearchQuery,
  onSearch,
  activeTab,
  setActiveTab,
  cartCount,
  orderCount,
  currentUser,
  onLogout
}) {
  return (
    <header className="daraz-header">
      <div className="daraz-header-container">
        <a href="#" className="daraz-logo" onClick={() => setActiveTab('catalog')}>
          <ShoppingBag size={28} color="#ffffff" />
          Smart<span style={{ color: '#212121' }}>RetailX</span>
        </a>

        {/* Daraz Search Bar */}
        <div className="daraz-search-box">
          <input
            type="text"
            placeholder="Search in SmartRetailX..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="daraz-search-input"
          />
          <button className="daraz-search-btn" onClick={onSearch}>
            <Search size={20} />
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              style={{
                background: activeTab === 'catalog' ? '#ffffff' : 'transparent',
                color: activeTab === 'catalog' ? '#f57224' : '#ffffff',
                border: 'none',
                padding: '0.4rem 0.8rem',
                fontWeight: 700,
                borderRadius: 2,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('catalog')}
            >
              SHOP
            </button>
            <button
              style={{
                background: activeTab === 'orders' ? '#ffffff' : 'transparent',
                color: activeTab === 'orders' ? '#f57224' : '#ffffff',
                border: 'none',
                padding: '0.4rem 0.8rem',
                fontWeight: 700,
                borderRadius: 2,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('orders')}
            >
              MY ORDERS ({orderCount})
            </button>
          </div>

          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveTab('cart')}>
            <ShoppingCart size={24} color="#ffffff" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -8, right: -10, background: '#212121', color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, borderRadius: 999, padding: '2px 6px' }}>
                {cartCount}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{currentUser?.full_name || currentUser?.email}</span>
            <button style={{ background: 'rgba(0,0,0,0.2)', color: '#fff', border: 'none', padding: '0.35rem 0.65rem', borderRadius: 2, fontSize: '0.75rem', cursor: 'pointer' }} onClick={onLogout}>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
