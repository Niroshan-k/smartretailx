# 📦 SmartRetailX Product Catalog Service

The **Catalog Service** manages product items, categories, pricing, and descriptions. It integrates with **Amazon ElastiCache Redis** (Cache-Aside pattern) for ultra-low latency product browsing.

---

## 🛠️ Tech Stack & Features
- **Framework**: FastAPI (Python 3.11)
- **Database & Cache**: Amazon RDS PostgreSQL (`catalog_db` schema) & ElastiCache Redis
- **Security**: JWT Bearer token protection on Admin mutation endpoints (`POST`, `PUT`, `DELETE`)
- **Observability**: Prometheus metrics endpoint (`/metrics`)

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `GET` | `/api/v1/catalog` | Lists product catalog items (with optional category filtering) | ❌ No (Guest Browsing) |
| `GET` | `/api/v1/catalog/{id}` | Gets product details by ID | ❌ No (Guest Browsing) |
| `POST` | `/api/v1/catalog` | Creates a new product item | 🔑 Admin Bearer Token |
| `PUT` | `/api/v1/catalog/{id}` | Updates existing product details | 🔑 Admin Bearer Token |
| `DELETE` | `/api/v1/catalog/{id}` | Deletes a product item | 🔑 Admin Bearer Token |
| `GET` | `/health` | Service health check | ❌ No |

---

## 💻 Environment Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8002` | Application port |
| `DATABASE_URL` | `postgresql://catalog_admin:...@localhost:5432/catalog_db` | PostgreSQL connection string |
| `REDIS_HOST` | `localhost` | ElastiCache Redis host for catalog caching |
| `REDIS_PORT` | `6379` | Redis cache port |
