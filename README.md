# SmartRetailX Global Commerce Platform

Cloud-native distributed microservices commerce platform built for the cloud engineering assignment.

## Architecture
- **5 Microservices (Python / FastAPI / PostgreSQL)**:
  - `smartretailx-user-service`: User auth & RBAC profile management
  - `smartretailx-catalog-service`: Global product items, categories, pricing
  - `smartretailx-inventory-service`: Warehouse stock tracking & async event listener
  - `smartretailx-payment-service`: Payment transaction processing & receipt logging
  - `smartretailx-order-service`: Order placement, REST orchestration & Kafka event publishing
- **Shared Library (`smartretailx-common`)**: Shared security JWT, logging, schemas, exceptions, event schemas
- **API Gateway (`smartretailx-gateway`)**: Nginx reverse proxy routing on port `8080`
- **Event Streaming (`redpanda`)**: Kafka-compatible event stream for real-time stock deduction
- **Frontend (`smartretailx-frontend`)**: React (Vite) application on port `3000`

## Running Locally

### Quick Start with Docker Compose
```bash
docker-compose up --build
```

Access Points:
- **Frontend App**: `http://localhost:3000`
- **API Gateway**: `http://localhost:8080`
- **User Service Docs**: `http://localhost:8001/docs`
- **Catalog Service Docs**: `http://localhost:8002/docs`
- **Inventory Service Docs**: `http://localhost:8003/docs`
- **Payment Service Docs**: `http://localhost:8004/docs`
- **Order Service Docs**: `http://localhost:8005/docs`
