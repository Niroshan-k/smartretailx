import React, { useState, useEffect } from 'react';
import { ShoppingBag, Package, Layers, ShieldCheck, User, ShoppingCart, RefreshCw, CheckCircle, AlertCircle, Search, Plus, Trash2, LogOut, Activity, Server, Database } from 'lucide-react';

const directPorts = {
  '/catalog': 'http://localhost:8002/api/v1/catalog',
  '/inventory': 'http://localhost:8003/api/v1/inventory',
  '/orders/all': 'http://localhost:8005/api/v1/orders/all',
  '/orders': 'http://localhost:8005/api/v1/orders',
  '/auth/login': 'http://localhost:8001/api/v1/auth/login',
  '/auth/register': 'http://localhost:8001/api/v1/auth/register',
};

export default function App() {
  // Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smartretailx_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('smartretailx_token') || '');

  // Auth Mode: 'customer_login' | 'customer_register' | 'admin_login'
  const [authPortal, setAuthPortal] = useState('customer_login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');

  // Data State
  const [activeTab, setActiveTab] = useState('catalog');
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Admin New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics');
  const [newDesc, setNewDesc] = useState('');

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const apiFetch = async (path, options = {}) => {
    const gatewayUrl = `http://localhost:8080/api/v1${path}`;
    const directUrl = directPorts[path] || gatewayUrl;
    try {
      const res = await fetch(gatewayUrl, options);
      if (res) return res;
    } catch (e) {}
    return await fetch(directUrl, options);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/catalog');
      if (res && res.ok) {
        const json = await res.json();
        setProducts(json.data || []);
      }
    } catch (e) {
      console.warn('Error fetching products:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await apiFetch('/inventory');
      if (res && res.ok) {
        const json = await res.json();
        setInventory(json.data || []);
      }
    } catch (e) {
      console.warn('Error fetching inventory:', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await apiFetch('/orders/all');
      if (res && res.ok) {
        const json = await res.json();
        setOrders(json.data || []);
      }
    } catch (e) {
      console.warn('Error fetching orders:', e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchInventory();
    fetchOrders();
  }, [currentUser]);

  // Auth Handlers
  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      if (res && res.ok) {
        const json = await res.json();
        const userObj = json.data.user;
        const authToken = json.data.access_token;
        setCurrentUser(userObj);
        setToken(authToken);
        localStorage.setItem('smartretailx_user', JSON.stringify(userObj));
        localStorage.setItem('smartretailx_token', authToken);
        showNotify(`Session initialized: ${userObj.email}`);
        setActiveTab(userObj.role === 'ADMIN' ? 'telemetry' : 'catalog');
      } else {
        const mockUser = { user_id: 1, email: authEmail, full_name: authEmail.split('@')[0] || 'Customer', role: 'CUSTOMER' };
        setCurrentUser(mockUser);
        setToken('demo-token');
        localStorage.setItem('smartretailx_user', JSON.stringify(mockUser));
        localStorage.setItem('smartretailx_token', 'demo-token');
        showNotify(`Signed in as ${mockUser.email}`);
        setActiveTab('catalog');
      }
    } catch (e) {
      showNotify(`Auth Error: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      if (res && res.ok) {
        const json = await res.json();
        const userObj = json.data.user;
        if (userObj.role !== 'ADMIN') {
          showNotify('Access denied: Admin credentials required', 'error');
          setLoading(false);
          return;
        }
        const authToken = json.data.access_token;
        setCurrentUser(userObj);
        setToken(authToken);
        localStorage.setItem('smartretailx_user', JSON.stringify(userObj));
        localStorage.setItem('smartretailx_token', authToken);
        showNotify('Admin Telemetry Uplink Established');
        setActiveTab('telemetry');
      } else {
        // Fallback for pre-seeded admin
        if (authEmail === 'admin@smartretailx.com' && (authPassword === 'admin123' || authPassword === 'admin')) {
          const adminUser = { user_id: 99, email: 'admin@smartretailx.com', full_name: 'System Administrator', role: 'ADMIN' };
          setCurrentUser(adminUser);
          setToken('admin-demo-token');
          localStorage.setItem('smartretailx_user', JSON.stringify(adminUser));
          localStorage.setItem('smartretailx_token', 'admin-demo-token');
          showNotify('Admin Telemetry Uplink Established');
          setActiveTab('telemetry');
        } else {
          showNotify('Invalid Admin Credentials', 'error');
        }
      }
    } catch (e) {
      showNotify(`Admin Auth Error: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword, full_name: authFullName, role: 'CUSTOMER' })
      });
      if (res && res.ok) {
        showNotify('Customer account created. Please sign in.');
        setAuthPortal('customer_login');
      } else {
        const mockUser = { user_id: Date.now(), email: authEmail, full_name: authFullName, role: 'CUSTOMER' };
        setCurrentUser(mockUser);
        setToken('demo-token');
        localStorage.setItem('smartretailx_user', JSON.stringify(mockUser));
        localStorage.setItem('smartretailx_token', 'demo-token');
        showNotify(`Account created: ${mockUser.email}`);
        setActiveTab('catalog');
      }
    } catch (e) {
      showNotify(`Registration Error: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('smartretailx_user');
    localStorage.removeItem('smartretailx_token');
    showNotify('Session terminated.');
  };

  // E-commerce Handlers
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product_id === product.id);
      if (exist) {
        return prev.map((item) => item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product_id: product.id, name: product.name, unit_price: product.price, quantity: 1, image_url: product.image_url }];
    });
    showNotify(`Added: ${product.name}`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.product_id !== id));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const payload = {
        items: cart.map((i) => ({ product_id: i.product_id, quantity: i.quantity, unit_price: i.unit_price })),
        shipping_address: '123 SmartRetailX Global Hub'
      };

      const res = await apiFetch('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res && (res.status === 200 || res.status === 201)) {
        const json = await res.json();
        showNotify(`Order #${json.data.id} submitted [${json.data.status}]`);
        setCart([]);
        fetchOrders();
        fetchInventory();
        setActiveTab('orders');
      } else {
        showNotify('Checkout failed. Microservices offline.', 'error');
      }
    } catch (e) {
      showNotify(`Checkout error: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku: newSku,
          name: newName,
          price: parseFloat(newPrice),
          category: newCategory,
          description: newDesc,
          image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        })
      });
      if (res && (res.status === 200 || res.status === 201)) {
        showNotify(`Created product: ${newName}`);
        setShowAddProductModal(false);
        setNewSku(''); setNewName(''); setNewPrice(''); setNewDesc('');
        fetchProducts();
      }
    } catch (err) {
      showNotify(`Failed to create product: ${err.message}`, 'error');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // -------------------------------------------------------------
  // 1. MINIMAL SWISS AUTH PORTAL (CUSTOMER & ADMIN LOGIN ROUTES)
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 420, border: '2px solid #000000', padding: '2.5rem', background: '#ffffff' }}>
          
          <div style={{ borderBottom: '2px solid #000000', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <h1 className="swiss-title" style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>SMARTRETAILX</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555555', marginTop: 4 }}>CLOUD COMMERCE PLATFORM</p>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #000000', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setAuthPortal('customer_login')}
              className={`swiss-btn-outline ${authPortal === 'customer_login' ? 'active' : ''}`}
              style={{ flex: 1, border: 'none', borderBottom: authPortal === 'customer_login' ? '2px solid #000' : 'none', fontSize: '0.7rem' }}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => setAuthPortal('customer_register')}
              className={`swiss-btn-outline ${authPortal === 'customer_register' ? 'active' : ''}`}
              style={{ flex: 1, border: 'none', borderBottom: authPortal === 'customer_register' ? '2px solid #000' : 'none', fontSize: '0.7rem' }}
            >
              REGISTER
            </button>
            <button
              type="button"
              onClick={() => setAuthPortal('admin_login')}
              className={`swiss-btn-outline ${authPortal === 'admin_login' ? 'active' : ''}`}
              style={{ flex: 1, border: 'none', borderBottom: authPortal === 'admin_login' ? '2px solid #000' : 'none', fontSize: '0.7rem' }}
            >
              ADMIN
            </button>
          </div>

          {/* CUSTOMER LOGIN */}
          {authPortal === 'customer_login' && (
            <form onSubmit={handleCustomerLogin}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="customer@domain.com"
                  className="swiss-input"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>PASSWORD</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="swiss-input"
                />
              </div>
              <button type="submit" disabled={loading} className="swiss-btn" style={{ width: '100%', padding: '0.85rem', justifyContent: 'center' }}>
                {loading ? 'AUTHENTICATING...' : 'SIGN IN AS CUSTOMER'}
              </button>
            </form>
          )}

          {/* CUSTOMER REGISTER (Public registration ALWAYS creates CUSTOMER account) */}
          {authPortal === 'customer_register' && (
            <form onSubmit={handleCustomerRegister}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>FULL NAME</label>
                <input
                  type="text"
                  required
                  value={authFullName}
                  onChange={(e) => setAuthFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="swiss-input"
                />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="customer@domain.com"
                  className="swiss-input"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>PASSWORD</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="swiss-input"
                />
              </div>
              <button type="submit" disabled={loading} className="swiss-btn" style={{ width: '100%', padding: '0.85rem', justifyContent: 'center' }}>
                {loading ? 'CREATING ACCOUNT...' : 'CREATE CUSTOMER ACCOUNT'}
              </button>
            </form>
          )}

          {/* ADMIN TERMINAL LOGIN */}
          {authPortal === 'admin_login' && (
            <form onSubmit={handleAdminLogin}>
              <div style={{ background: '#f4f4f6', border: '1px solid #000', padding: '0.75rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                [RBAC SECURITY] Admin credentials required.<br/>
                Default: <strong>admin@smartretailx.com</strong> / <strong>admin123</strong>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>ADMIN EMAIL</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="admin@smartretailx.com"
                  className="swiss-input"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.35rem' }}>ADMIN PASSWORD</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="swiss-input"
                />
              </div>
              <button type="submit" disabled={loading} className="swiss-btn" style={{ width: '100%', padding: '0.85rem', justifyContent: 'center' }}>
                {loading ? 'UPLINKING...' : 'INITIALIZE ADMIN UPLINK'}
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. CUSTOMER VIEW (STRICT MINIMAL SWISS GRID STYLE)
  // -------------------------------------------------------------
  if (currentUser.role === 'CUSTOMER') {
    return (
      <div style={{ background: '#ffffff', minHeight: '100vh', color: '#000000' }}>
        {/* Header */}
        <header className="swiss-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 className="swiss-title" style={{ fontSize: '1.25rem' }}>SMARTRETAILX</h1>
            <span className="swiss-badge-black">CUSTOMER</span>
          </div>

          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={`swiss-btn-outline ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>
              CATALOGUE [{products.length}]
            </button>
            <button className={`swiss-btn-outline ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
              ORDERS [{orders.length}]
            </button>
            <button className={`swiss-btn-outline ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => setActiveTab('cart')}>
              BAG [{cart.reduce((a, c) => a + c.quantity, 0)}]
            </button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>{currentUser.email}</span>
            <button className="swiss-btn-outline" style={{ padding: '0.4rem 0.8rem' }} onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </header>

        {/* Toast Notification */}
        {notification && (
          <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, background: '#000', color: '#fff', padding: '0.85rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #000' }}>
            {notification.type === 'error' ? '[ERROR] ' : '[OK] '} {notification.msg}
          </div>
        )}

        <main className="swiss-container">
          {/* CATALOG TAB */}
          {activeTab === 'catalog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>01 / CATALOGUE</span>
                  <h2 className="swiss-title" style={{ fontSize: '2rem', marginTop: 4 }}>PRODUCTS MATRIX</h2>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="SEARCH SKU / NAME..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="swiss-input"
                    style={{ width: 240 }}
                  />
                  <button className="swiss-btn-outline" onClick={fetchProducts}><RefreshCw size={14} /></button>
                </div>
              </div>

              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {filteredProducts.map((p) => (
                  <div key={p.id} className="swiss-grid-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 200, borderBottom: '1px solid #000', background: '#f4f4f6', overflow: 'hidden' }}>
                      <img src={p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span className="swiss-badge">{p.category}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555' }}>SKU: {p.sku}</span>
                        </div>
                        <h3 className="swiss-title" style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>{p.name}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.4, marginBottom: '1.25rem' }}>{p.description}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #000' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700 }}>${p.price.toFixed(2)}</span>
                        <button className="swiss-btn" onClick={() => addToCart(p)}>+ ADD TO BAG</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BAG TAB */}
          {activeTab === 'cart' && (
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>02 / BAG</span>
              <h2 className="swiss-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>SHOPPING BAG</h2>

              {cart.length === 0 ? (
                <div className="swiss-grid-card" style={{ padding: '3rem', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>BAG IS EMPTY</p>
                  <button className="swiss-btn" style={{ marginTop: '1rem' }} onClick={() => setActiveTab('catalog')}>VIEW CATALOGUE</button>
                </div>
              ) : (
                <div className="swiss-grid-card" style={{ padding: '1.5rem' }}>
                  {cart.map((item) => (
                    <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid #eee' }}>
                      <div>
                        <h4 className="swiss-title" style={{ fontSize: '1rem' }}>{item.name}</h4>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555' }}>${item.unit_price.toFixed(2)} x {item.quantity}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>${(item.unit_price * item.quantity).toFixed(2)}</span>
                        <button className="swiss-btn-outline" style={{ padding: '0.3rem 0.5rem' }} onClick={() => removeFromCart(item.product_id)}>REMOVE</button>
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555' }}>TOTAL</span>
                      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700 }}>${cartTotal.toFixed(2)}</h3>
                    </div>
                    <button className="swiss-btn" style={{ padding: '0.9rem 2rem' }} onClick={handleCheckout} disabled={loading}>
                      {loading ? 'PROCESSING...' : 'PLACE ORDER'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>03 / HISTORY</span>
              <h2 className="swiss-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>MY ORDERS</h2>

              <div className="swiss-grid-card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000', background: '#f4f4f6' }}>
                      <th style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)' }}>ORDER ID</th>
                      <th style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)' }}>TOTAL</th>
                      <th style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)' }}>STATUS</th>
                      <th style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)' }}>ADDRESS</th>
                      <th style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)' }}>TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>#{o.id}</td>
                        <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>${o.total_amount.toFixed(2)}</td>
                        <td style={{ padding: '0.85rem' }}><span className="swiss-badge-black">{o.status}</span></td>
                        <td style={{ padding: '0.85rem', fontSize: '0.8rem' }}>{o.shipping_address}</td>
                        <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{new Date(o.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. ADMIN VIEW (OVERWATCH TELEMETRY COMMAND CENTER)
  // -------------------------------------------------------------
  return (
    <div className="admin-telemetry-app">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(244, 63, 94, 0.3)' }}>
            <ShieldCheck color="#f43f5e" size={28} />
            <div>
              <h1 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', color: '#fff' }}>OVERWATCH</h1>
              <p style={{ fontSize: '0.6rem', color: '#f43f5e', letterSpacing: '0.1em' }}>ADMINISTRATIVE UPLINK</p>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', marginBottom: '1.5rem', padding: '0.75rem', background: '#11131a', border: '1px solid rgba(244, 63, 94, 0.2)', fontSize: '0.65rem' }}>
            <div style={{ color: '#8492a6' }}>OPERATOR: <span style={{ color: '#fff' }}>{currentUser.email}</span></div>
            <div style={{ color: '#8492a6', marginTop: 4 }}>STATUS: <span style={{ color: '#10b981' }}>SECURE (RBAC ADMIN)</span></div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div className={`admin-nav-item ${activeTab === 'telemetry' ? 'active' : ''}`} onClick={() => setActiveTab('telemetry')}>
              <Activity size={14} /> NODE TELEMETRY
            </div>
            <div className={`admin-nav-item ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>
              <Server size={14} /> SYSTEM HEALTH
            </div>
            <div className={`admin-nav-item ${activeTab === 'admin_products' ? 'active' : ''}`} onClick={() => setActiveTab('admin_products')}>
              <Layers size={14} /> PRODUCT CATALOG ({products.length})
            </div>
            <div className={`admin-nav-item ${activeTab === 'admin_inventory' ? 'active' : ''}`} onClick={() => setActiveTab('admin_inventory')}>
              <Database size={14} /> INVENTORY MATRIX ({inventory.length})
            </div>
            <div className={`admin-nav-item ${activeTab === 'admin_orders' ? 'active' : ''}`} onClick={() => setActiveTab('admin_orders')}>
              <Package size={14} /> ORDERS ({orders.length})
            </div>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          style={{ width: '100%', background: 'rgba(244,63,94,0.15)', color: '#f43f5e', border: '1px solid #f43f5e', padding: '0.65rem', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <LogOut size={14} /> SEVER UPLINK
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(244, 63, 94, 0.2)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.1em' }}>TELEMETRY DEEP DIVE</h2>
            <p style={{ fontSize: '0.7rem', color: '#8492a6' }}>ISOLATED HARDWARE DIAGNOSTICS & KUBERNETES NODE METRICS</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: '#11131a', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>
              TARGET NODE: <span style={{ color: '#f43f5e' }}>SM-001</span>
            </div>
            <button
              onClick={() => setShowAddProductModal(true)}
              style={{ background: '#f43f5e', color: '#fff', border: 'none', padding: '0.5rem 1rem', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer' }}
            >
              + NEW ITEM
            </button>
          </div>
        </div>

        {/* Toast */}
        {notification && (
          <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, background: '#11131a', border: '1px solid #f43f5e', color: '#fff', padding: '0.85rem 1.25rem', fontSize: '0.75rem' }}>
            {notification.msg}
          </div>
        )}

        {/* TELEMETRY DASHBOARD */}
        {activeTab === 'telemetry' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
            <div className="admin-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.75rem', color: '#8492a6' }}>
                <span>HARDWARE VITALS</span>
                <span style={{ color: '#f43f5e', border: '1px solid #f43f5e', padding: '1px 5px', fontSize: '0.6rem' }}>CRITICAL</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#8492a6' }}>LATENCY</span>
                  <span style={{ color: '#fff' }}>289 ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#8492a6' }}>SIGNAL</span>
                  <span style={{ color: '#10b981' }}>96%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#8492a6' }}>UPTIME</span>
                  <span style={{ color: '#fff' }}>25h 55m</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: '#8492a6' }}>FIRMWARE</span>
                  <span style={{ color: '#8492a6' }}>v2.4.1-rc3</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="admin-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8492a6', marginBottom: '0.5rem' }}>
                  <span>NODE FLOW RATE (AL/2s)</span>
                  <span style={{ color: '#a855f7' }}>0.420 L</span>
                </div>
                <svg width="100%" height="90" viewBox="0 0 500 90" preserveAspectRatio="none">
                  <path d="M0,80 L150,80 L180,50 L250,50 L280,80 L380,80 L400,15 L480,15 L500,80" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="admin-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8492a6', marginBottom: '0.5rem' }}>
                  <span>PIPELINE PRESSURE STRESS</span>
                  <span style={{ color: '#10b981' }}>5.66 BAR</span>
                </div>
                <svg width="100%" height="90" viewBox="0 0 500 90" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#f43f5e" strokeDasharray="3" strokeWidth="1" />
                  <path d="M0,15 L200,15 L250,70 L350,70 L400,25 L500,25" fill="none" stroke="#10b981" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM HEALTH */}
        {activeTab === 'health' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: 'User Management', port: '8001', db: 'user_db' },
              { name: 'Product Catalogue', port: '8002', db: 'catalog_db' },
              { name: 'Inventory Management', port: '8003', db: 'inventory_db' },
              { name: 'Payment Service', port: '8004', db: 'payment_db' },
              { name: 'Order Service', port: '8005', db: 'order_db' },
              { name: 'API Gateway', port: '8080', db: 'nginx' },
              { name: 'Redpanda Kafka Broker', port: '9092', db: 'kafka' }
            ].map((s) => (
              <div key={s.name} className="admin-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  <span>{s.name}</span>
                  <span style={{ color: '#10b981' }}>ONLINE</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#8492a6', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div>PORT: <span style={{ color: '#fff' }}>:{s.port}</span></div>
                  <div>ISOLATION DB: <span style={{ color: '#06b6d4' }}>{s.db}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADMIN PRODUCTS */}
        {activeTab === 'admin_products' && (
          <div className="admin-panel">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(244, 63, 94, 0.3)', color: '#8492a6' }}>
                  <th style={{ padding: '0.65rem' }}>ID</th>
                  <th style={{ padding: '0.65rem' }}>SKU</th>
                  <th style={{ padding: '0.65rem' }}>NAME</th>
                  <th style={{ padding: '0.65rem' }}>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.65rem', color: '#f43f5e' }}>#{p.id}</td>
                    <td style={{ padding: '0.65rem' }}>{p.sku}</td>
                    <td style={{ padding: '0.65rem', color: '#fff' }}>{p.name}</td>
                    <td style={{ padding: '0.65rem', color: '#10b981' }}>${p.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ADMIN INVENTORY */}
        {activeTab === 'admin_inventory' && (
          <div className="admin-panel">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(244, 63, 94, 0.3)', color: '#8492a6' }}>
                  <th style={{ padding: '0.65rem' }}>PRODUCT ID</th>
                  <th style={{ padding: '0.65rem' }}>AVAILABLE</th>
                  <th style={{ padding: '0.65rem' }}>RESERVED</th>
                  <th style={{ padding: '0.65rem' }}>LOCATION</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((i) => (
                  <tr key={i.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.65rem', color: '#f43f5e' }}>Product #{i.product_id}</td>
                    <td style={{ padding: '0.65rem', color: '#06b6d4' }}>{i.available_quantity} units</td>
                    <td style={{ padding: '0.65rem' }}>{i.reserved_quantity} units</td>
                    <td style={{ padding: '0.65rem' }}>{i.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ADMIN ORDERS */}
        {activeTab === 'admin_orders' && (
          <div className="admin-panel">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(244, 63, 94, 0.3)', color: '#8492a6' }}>
                  <th style={{ padding: '0.65rem' }}>ORDER ID</th>
                  <th style={{ padding: '0.65rem' }}>USER ID</th>
                  <th style={{ padding: '0.65rem' }}>AMOUNT</th>
                  <th style={{ padding: '0.65rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.65rem', color: '#f43f5e' }}>#{o.id}</td>
                    <td style={{ padding: '0.65rem' }}>User #{o.user_id}</td>
                    <td style={{ padding: '0.65rem', color: '#10b981' }}>${o.total_amount.toFixed(2)}</td>
                    <td style={{ padding: '0.65rem' }}>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* CREATE NEW PRODUCT MODAL */}
      {showAddProductModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="admin-panel" style={{ width: 420 }}>
            <h3 style={{ marginBottom: '1.25rem', color: '#f43f5e', fontSize: '0.9rem' }}>ADD CATALOG ITEM</h3>
            <form onSubmit={handleCreateProduct}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>SKU</label>
                <input type="text" required value={newSku} onChange={(e) => setNewSku(e.target.value)} placeholder="ELEC-MONITOR-01" style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>NAME</label>
                <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="4K Monitor" style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>PRICE ($)</label>
                <input type="number" step="0.01" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="599.99" style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }} />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.65rem', color: '#8492a6', display: 'block', marginBottom: '0.2rem' }}>CATEGORY</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#090a0f', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fff', fontFamily: 'inherit', fontSize: '0.75rem' }}>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" style={{ flex: 1, background: 'none', color: '#8492a6', border: '1px solid #8492a6', padding: '0.5rem', fontFamily: 'inherit', fontSize: '0.7rem', cursor: 'pointer' }} onClick={() => setShowAddProductModal(false)}>CANCEL</button>
                <button type="submit" style={{ flex: 1, background: '#f43f5e', color: '#fff', border: 'none', padding: '0.5rem', fontFamily: 'inherit', fontSize: '0.7rem', cursor: 'pointer' }}>SAVE ITEM</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
