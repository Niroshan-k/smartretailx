# 💳 SmartRetailX Payment Processing Service

The **Payment Service** handles financial transaction processing, receipt generation, and event publishing to **Redpanda Kafka**. It is secured with Zero-Trust JWT authentication.

---

## 🛠️ Tech Stack & Features
- **Framework**: FastAPI (Python 3.11)
- **Database**: Amazon RDS PostgreSQL (`payment_db` schema)
- **Event Publisher**: Emits `PaymentProcessed` events to Kafka `payments-topic`
- **Security**: OAuth 2.0 / JWT Bearer token enforcement on all payment processing and receipt endpoints
- **Observability**: Prometheus metrics endpoint (`/metrics`)

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `POST` | `/api/v1/payments/process` | Processes order payment transaction & publishes to Kafka | 🔑 Bearer Token |
| `GET` | `/api/v1/payments/{payment_id}` | Gets payment transaction receipt by ID | 🔑 Bearer Token |
| `GET` | `/api/v1/payments/order/{order_id}` | Gets payment transaction details for order | 🔑 Bearer Token |
| `GET` | `/health` | Service health check | ❌ No |

---

## 💻 Environment Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8004` | Application port |
| `DATABASE_URL` | `postgresql://payment_admin:...@localhost:5432/payment_db` | PostgreSQL connection string |
| `JWT_SECRET` | `smartretailx-super-secret-key-change-in-production` | Secret key for verifying JWT tokens |
| `KAFKA_BOOTSTRAP_SERVERS` | `localhost:9092` | Redpanda Kafka broker address |
