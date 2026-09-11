# 🔀 SmartRetailX Nginx API Gateway

The **API Gateway** acts as the single entry point for all incoming HTTP traffic into the microservices cluster. It handles URL reverse proxy routing, CORS handling, rate limiting, and request forwarding.

---

## 🛠️ Tech Stack & Features
- **Server**: Nginx (Alpine Container)
- **Routing**: Proxy pass rules mapping `/api/v1/*` to individual microservice cluster IPs/ports
- **CORS**: Wildcard / strict domain origin headers for frontend SPA integration

---

## 🌐 Gateway Route Mapping

| Incoming Path | Target Microservice | Target Port |
| :--- | :--- | :---: |
| `/api/v1/auth/*` | `auth-service` | `8006` |
| `/api/v1/users/*` | `user-service` | `8001` |
| `/api/v1/catalog/*` | `catalog-service` | `8002` |
| `/api/v1/inventory/*` | `inventory-service` | `8003` |
| `/api/v1/payments/*` | `payment-service` | `8004` |
| `/api/v1/orders/*` | `order-service` | `8005` |
| `/health` | Gateway health check | `80` |
