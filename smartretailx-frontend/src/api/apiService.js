const API_BASE = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080/api/v1';

export const apiFetch = async (path, options = {}) => {
  const gatewayUrl = `${API_BASE}${path}`;
  return await fetch(gatewayUrl, options);
};

export const serviceHealthEndpoints = [
  { id: 'auth', name: 'Authentication & Token Service', port: '8006', db: 'auth_db', url: `${API_BASE}/auth/login` },
  { id: 'user', name: 'User Management Service', port: '8001', db: 'user_db', url: `${API_BASE}/users` },
  { id: 'catalog', name: 'Product Catalogue Service', port: '8002', db: 'catalog_db', url: `${API_BASE}/catalog` },
  { id: 'inventory', name: 'Inventory Management Service', port: '8003', db: 'inventory_db', url: `${API_BASE}/inventory` },
  { id: 'payment', name: 'Payment Processing Service', port: '8004', db: 'payment_db', url: `${API_BASE}/payments/process` },
  { id: 'order', name: 'Order Processing Service', port: '8005', db: 'order_db', url: `${API_BASE}/orders` },
  { id: 'gateway', name: 'API Gateway Router', port: '8080', db: 'gateway', url: `${API_BASE}/catalog` },
  { id: 'kafka', name: 'Redpanda Event Broker', port: '9092', db: 'kafka', url: `${API_BASE}/orders` }
];
