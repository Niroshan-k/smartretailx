const directPorts = {
  '/catalog': 'http://localhost:8002/api/v1/catalog',
  '/inventory': 'http://localhost:8003/api/v1/inventory',
  '/orders/all': 'http://localhost:8005/api/v1/orders/all',
  '/orders': 'http://localhost:8005/api/v1/orders',
  '/payments/process': 'http://localhost:8004/api/v1/payments/process',
  '/auth/login': 'http://localhost:8006/api/v1/auth/login',
  '/auth/register': 'http://localhost:8006/api/v1/auth/register',
};

export const apiFetch = async (path, options = {}) => {
  const gatewayUrl = `http://localhost:8080/api/v1${path}`;
  const directUrl = directPorts[path] || gatewayUrl;
  try {
    const res = await fetch(gatewayUrl, options);
    if (res && res.status !== 502 && res.status !== 503) return res;
  } catch (e) {}
  return await fetch(directUrl, options);
};

export const serviceHealthEndpoints = [
  { id: 'auth', name: 'Authentication & Token Service', port: '8006', db: 'auth_db', url: 'http://localhost:8006/health' },
  { id: 'user', name: 'User Management Service', port: '8001', db: 'user_db', url: 'http://localhost:8001/health' },
  { id: 'catalog', name: 'Product Catalogue Service', port: '8002', db: 'catalog_db', url: 'http://localhost:8002/api/v1/catalog' },
  { id: 'inventory', name: 'Inventory Management Service', port: '8003', db: 'inventory_db', url: 'http://localhost:8003/api/v1/inventory' },
  { id: 'payment', name: 'Payment Processing Service', port: '8004', db: 'payment_db', url: 'http://localhost:8004/health' },
  { id: 'order', name: 'Order Processing Service', port: '8005', db: 'order_db', url: 'http://localhost:8005/health' },
  { id: 'gateway', name: 'Nginx API Gateway', port: '8080', db: 'gateway', url: 'http://localhost:8080/health' },
  { id: 'kafka', name: 'Redpanda Kafka Event Broker', port: '9092', db: 'kafka', url: 'http://localhost:19644/v1/status/ready' }
];
