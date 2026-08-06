import React, { useState } from 'react';
import CustomerHeader from '../components/customer/CustomerHeader';
import FlashSaleSection from '../components/customer/FlashSaleSection';
import CategorySection from '../components/customer/CategorySection';
import ProductCatalogGrid from '../components/customer/ProductCatalogGrid';
import ShoppingCartView from '../components/customer/ShoppingCartView';
import CustomerOrdersView from '../components/customer/CustomerOrdersView';
import PaymentCheckoutModal from '../components/customer/PaymentCheckoutModal';

export default function CustomerPortal({
  currentUser,
  products,
  orders,
  cart,
  cartTotal,
  loading,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
  onRefreshProducts,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const handleProcessPaymentSubmit = async (cardDetails) => {
    const success = await onCheckout(cardDetails);
    if (success) {
      setShowPaymentModal(false);
      setActiveTab('orders');
    }
  };

  return (
    <div className="daraz-app">
      <CustomerHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onRefreshProducts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        orderCount={orders.length}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: 1240, margin: '1.5rem auto', padding: '0 1rem' }}>
        {activeTab === 'catalog' && (
          <div>
            <FlashSaleSection products={filteredProducts} onAddToCart={onAddToCart} onRefresh={onRefreshProducts} />
            <CategorySection selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <ProductCatalogGrid products={filteredProducts} onAddToCart={onAddToCart} />
          </div>
        )}

        {activeTab === 'cart' && (
          <ShoppingCartView
            cart={cart}
            cartTotal={cartTotal}
            onRemoveFromCart={onRemoveFromCart}
            onCheckout={() => setShowPaymentModal(true)}
            onContinueShopping={() => setActiveTab('catalog')}
            loading={loading}
          />
        )}

        {activeTab === 'orders' && (
          <CustomerOrdersView orders={orders} />
        )}
      </main>

      <PaymentCheckoutModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        cart={cart}
        cartTotal={cartTotal}
        onProcessPayment={handleProcessPaymentSubmit}
        loading={loading}
      />
    </div>
  );
}
