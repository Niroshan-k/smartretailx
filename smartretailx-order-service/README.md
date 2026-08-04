# SmartRetailX - Order Processing Service

## Overview
Manages order placement, status tracking, REST calls to Payment Service, and publishes `OrderCreated` events to Kafka.

## Features
- **Endpoints**: Create Order (`POST /api/v1/orders`), User Orders (`GET /api/v1/orders`), All Orders (`GET /api/v1/orders/all`), Order Details (`GET /api/v1/orders/{id}`).
- **Kafka Event Producer**: Publishes `OrderCreated` events to `orders-topic`.
- **Port**: `8005`
