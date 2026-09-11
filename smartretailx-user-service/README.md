# 👤 SmartRetailX User Management Service

The **User Service** manages customer profiles, Role-Based Access Control (RBAC), and user metadata. It auto-provisions user profile records upon initial JWT token presentation.

---

## 🛠️ Tech Stack & Features
- **Framework**: FastAPI (Python 3.11)
- **Database**: Amazon RDS PostgreSQL (`user_db` schema)
- **Authentication**: JWT Bearer token validation using `smartretailx-common`
- **Observability**: Prometheus metrics endpoint (`/metrics`)

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `GET` | `/api/v1/users/me` | Retrieves the profile of the currently authenticated user | 🔑 Bearer Token |
| `GET` | `/api/v1/users/{user_id}` | Retrieves user profile details by ID | 🔑 Bearer Token |
| `GET` | `/health` | Service health check | ❌ No |

---

## 💻 Environment Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8001` | Application port |
| `DATABASE_URL` | `postgresql://user_admin:...@localhost:5432/user_db` | PostgreSQL connection string |
| `JWT_SECRET` | `smartretailx-super-secret-key-change-in-production` | Secret key for verifying JWT tokens |
