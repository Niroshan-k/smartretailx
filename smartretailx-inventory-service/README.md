# SmartRetailX - Inventory Management Service

## Overview
Manages product stock levels, location tracking, and handles real-time stock deduction asynchronously via Kafka events.

## Features
- **Endpoints**: List inventory (`GET /api/v1/inventory`), Product stock (`GET /api/v1/inventory/{id}`), Update stock (`PUT /api/v1/inventory/{id}`), Deduct stock (`POST /api/v1/inventory/deduct`).
- **Kafka Listener**: Listens to `orders-topic` and processes `OrderCreated` events.
- **Port**: `8003`
