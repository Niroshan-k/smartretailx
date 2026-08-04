# SmartRetailX - Payment Processing Service

## Overview
Handles transaction processing, payment confirmation, and publishes `PaymentProcessed` events to Kafka.

## Features
- **Endpoints**: Process payment (`POST /api/v1/payments/process`), Get by ID (`GET /api/v1/payments/{id}`), Get by Order (`GET /api/v1/payments/order/{order_id}`).
- **Kafka Event Producer**: Publishes to `payments-topic`.
- **Port**: `8004`
