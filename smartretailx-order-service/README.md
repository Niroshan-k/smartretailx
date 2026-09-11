# 🛒 SmartRetailX Order Processing Service

The **Order Service** orchestrates order placement, status tracking, and event emission to **Redpanda Kafka**. It initiates the **Choreography-based SAGA Pattern** across the microservices ecosystem.

---

## 🛠️ Tech Stack & Features
- **Framework**: FastAPI (Python 3.11)
- **Database**: Amazon RDS PostgreSQL (`order_db` schema)
- **Event Publisher**: Emits `OrderCreated` events to Kafka `orders-topic`
- **Security**: OAuth 2.0 / JWT Bearer token enforcement on order placement & user order history
- **Observability**: Prometheus metrics endpoint (`/metrics`)

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `POST` | `/api/v1/orders` | Places a new order and publishes `OrderCreated` event | 🔑 Bearer Token |
| `GET` | `/api/v1/orders` | Lists order history for the currently logged-in user | 🔑 Bearer Token |
| `GET` | `/api/v1/orders/all` | Lists all platform orders (Admin / Internal view) | ❌ No |
| `GET` | `/api/v1/orders/{order_id}` | Retrieves order details by order ID | ❌ No |
| `GET` | `/health` | Service health check | ❌ No |

---

## 💻 Environment Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8005` | Application port |
| `DATABASE_URL` | `postgresql://order_admin:...@localhost:5432/order_db` | PostgreSQL connection string |
| `JWT_SECRET` | `smartretailx-super-secret-key-change-in-production` | Secret key for verifying JWT tokens |
| `KAFKA_BOOTSTRAP_SERVERS` | `localhost:9092` | Redpanda Kafka broker address |
