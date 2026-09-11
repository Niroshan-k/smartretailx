# 🔐 SmartRetailX Auth Service

The **Auth Service** is a security-critical microservice responsible for OAuth 2.0 authentication, user registration, credential verification, and issuing signed **JWT Access Tokens**.

---

## 🛠️ Tech Stack & Features
- **Framework**: FastAPI (Python 3.11)
- **Database**: Amazon RDS PostgreSQL (`auth_db` schema)
- **Security**: Password hashing via `bcrypt`, JWT signature creation via `pyjwt` (Algorithm: `HS256`)
- **Observability**: Prometheus metrics endpoint (`/metrics`)

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :---: | :--- | :--- | :---: |
| `POST` | `/api/v1/auth/register` | Registers a new user account in PostgreSQL | ❌ No |
| `POST` | `/api/v1/auth/login` | Authenticates credentials and returns a Bearer JWT Token | ❌ No |
| `GET` | `/api/v1/auth/verify` | Validates JWT token signature and returns token payload | 🔑 Bearer Token |
| `GET` | `/health` | Service health check | ❌ No |

---

## 💻 Environment Variables

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8006` | Application port |
| `DATABASE_URL` | `postgresql://user_admin:...@localhost:5432/auth_db` | PostgreSQL connection string |
| `JWT_SECRET` | `smartretailx-super-secret-key-change-in-production` | Secret key used for signing JWT tokens |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | Token expiration time in minutes |
