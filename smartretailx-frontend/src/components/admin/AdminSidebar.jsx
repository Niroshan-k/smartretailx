import React from 'react';
import { ShieldCheck, Activity, Server, Layers, Database, Package, LogOut } from 'lucide-react';

export default function AdminSidebar({
  currentUser,
  activeTab,
  setActiveTab,
  productCount,
  inventoryCount,
  orderCount,
  onLogout
}) {
  return (
    <aside className="admin-sidebar">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <ShieldCheck color="#f43f5e" size={28} />
          <div>
            <h1 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', color: '#fff' }}>SMARTRETAILX</h1>
            <p style={{ fontSize: '0.6rem', color: '#f43f5e', letterSpacing: '0.1em' }}>ADMIN DASHBOARD</p>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', marginBottom: '1.5rem', padding: '0.75rem', background: '#11131a', border: '1px solid rgba(244, 63, 94, 0.2)', fontSize: '0.65rem' }}>
          <div style={{ color: '#8492a6' }}>ADMIN: <span style={{ color: '#fff' }}>{currentUser?.email}</span></div>
          <div style={{ color: '#8492a6', marginTop: 4 }}>STATUS: <span style={{ color: '#10b981' }}>REAL TIME MONITORING</span></div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div className={`admin-nav-item ${activeTab === 'telemetry' ? 'active' : ''}`} onClick={() => setActiveTab('telemetry')}>
            <Activity size={14} /> SYSTEM OVERVIEW
          </div>
          <div className={`admin-nav-item ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>
            <Server size={14} /> MICROSERVICES HEALTH
          </div>
          <div className={`admin-nav-item ${activeTab === 'admin_products' ? 'active' : ''}`} onClick={() => setActiveTab('admin_products')}>
            <Layers size={14} /> PRODUCTS ({productCount})
          </div>
          <div className={`admin-nav-item ${activeTab === 'admin_inventory' ? 'active' : ''}`} onClick={() => setActiveTab('admin_inventory')}>
            <Database size={14} /> WAREHOUSE INVENTORY ({inventoryCount})
          </div>
          <div className={`admin-nav-item ${activeTab === 'admin_orders' ? 'active' : ''}`} onClick={() => setActiveTab('admin_orders')}>
            <Package size={14} /> ALL ORDERS ({orderCount})
          </div>
        </nav>
      </div>

      <button
        onClick={onLogout}
        style={{
          width: '100%',
          background: 'rgba(244,63,94,0.15)',
          color: '#f43f5e',
          border: '1px solid #f43f5e',
          padding: '0.65rem',
          fontFamily: 'inherit',
          fontWeight: 700,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        <LogOut size={14} /> LOGOUT
      </button>
    </aside>
  );
}
