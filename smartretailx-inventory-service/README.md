# 📊 SmartRetailX Inventory Management Service

The **Inventory Service** tracks warehouse stock levels and participates in the **Choreography-based SAGA Pattern** by listening to Kafka `OrderCreated` events and auto-deducting product stock.

---

## 🛠️ Tech Stack & Features
- **Framework**: FastAPI (Python 3.11)
- **Database**: Amazon RDS PostgreSQL (`inventory_db` schema)
- **Event Consumer**: Background thread listening to Redpanda Kafka `orders-topic`
- **Security**: JWT Bearer token protection on stock adjustment endpoints
- **Observability**: Prometheus metrics endpoint (`/metrics`)

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `GET` | `/api/v1/inventory` | Lists stock levels for all products | ❌ No |
| `GET` | `/api/v1/inventory/{product_id}` | Gets stock level for a specific product | ❌ No |
| `PUT` | `/api/v1/inventory/{product_id}` | Sets warehouse stock quantity | 🔑 Bearer Token |
| `POST` | `/api/v1/inventory/deduct` | Deducts stock for order fulfillment | 🔑 Bearer Token |
| `GET` | `/health` | Service health check | ❌ No |

---

## 💻 Environment Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8003` | Application port |
| `DATABASE_URL` | `postgresql://inventory_admin:...@localhost:5432/inventory_db` | PostgreSQL connection string |
| `KAFKA_BOOTSTRAP_SERVERS` | `localhost:9092` | Redpanda Kafka broker address |
