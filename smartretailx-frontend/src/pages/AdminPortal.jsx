import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import SystemOverviewTab from '../components/admin/SystemOverviewTab';
import MicroserviceHealthTab from '../components/admin/MicroserviceHealthTab';
import AdminProductsTab from '../components/admin/AdminProductsTab';
import AdminInventoryTab from '../components/admin/AdminInventoryTab';
import AdminOrdersTab from '../components/admin/AdminOrdersTab';
import AddProductModal from '../components/admin/AddProductModal';
import ImagePreviewModal from '../components/common/ImagePreviewModal';

export default function AdminPortal({
  currentUser,
  products,
  inventory,
  orders,
  healthMetrics,
  onRefreshPings,
  onCreateProduct,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const totalAvailableStock = inventory.reduce((sum, i) => sum + (i.available_quantity || 0), 0);

  return (
    <div className="admin-telemetry-app">
      <AdminSidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productCount={products.length}
        inventoryCount={inventory.length}
        orderCount={orders.length}
        onLogout={onLogout}
      />

      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(244, 63, 94, 0.2)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.1em' }}>ADMIN CONTROL PANEL</h2>
            <p style={{ fontSize: '0.7rem', color: '#8492a6' }}>REAL-TIME BENCHMARKED LATENCY & MICROSERVICES HEALTH</p>
          </div>

          <button
            onClick={() => setShowAddProductModal(true)}
            style={{ background: '#f43f5e', color: '#fff', border: 'none', padding: '0.55rem 1.1rem', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}
          >
            + ADD NEW PRODUCT
          </button>
        </div>

        {activeTab === 'telemetry' && (
          <SystemOverviewTab
            orderCount={orders.length}
            totalRevenue={totalRevenue}
            productCount={products.length}
            totalAvailableStock={totalAvailableStock}
            healthMetrics={healthMetrics}
          />
        )}

        {activeTab === 'health' && (
          <MicroserviceHealthTab
            healthMetrics={healthMetrics}
            onRefreshPings={onRefreshPings}
          />
        )}

        {activeTab === 'admin_products' && (
          <AdminProductsTab
            products={products}
            onOpenAddModal={() => setShowAddProductModal(true)}
            onPreviewImage={(url) => setPreviewImage(url)}
          />
        )}

        {activeTab === 'admin_inventory' && (
          <AdminInventoryTab inventory={inventory} />
        )}

        {activeTab === 'admin_orders' && (
          <AdminOrdersTab orders={orders} />
        )}
      </main>

      <ImagePreviewModal previewImage={previewImage} onClose={() => setPreviewImage(null)} />
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onCreateProduct={onCreateProduct}
      />
    </div>
  );
}
