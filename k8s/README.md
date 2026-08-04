# SmartRetailX - Kubernetes (EKS) Deployment Manifests

This directory contains production-ready Kubernetes manifests for deploying the SmartRetailX Commerce Platform on **Amazon EKS (Elastic Kubernetes Service)** or local Kubernetes (`minikube` / Docker Desktop K8s).

## Manifests Included
- `user-service.yaml`: Deployment (2 replicas) & ClusterIP service for User Auth.
- `catalog-service.yaml`: Deployment (2 replicas) & ClusterIP service for Product Catalog.
- `inventory-service.yaml`: Deployment (2 replicas) & ClusterIP service for Inventory Management.
- `payment-service.yaml`: Deployment (2 replicas) & ClusterIP service for Payment Processing.
- `order-service.yaml`: Deployment (2 replicas) & ClusterIP service for Order Processing.
- `ingress.yaml`: Nginx Ingress Controller routing all `/api/v1/*` paths to services.

## Deploying to Kubernetes

```bash
# 1. Create DB Secrets
kubectl create secret generic db-secrets \
  --from-literal=USER_DB_URL=postgresql://user_admin:user_password@user-db:5432/user_db \
  --from-literal=CATALOG_DB_URL=postgresql://catalog_admin:catalog_password@catalog-db:5432/catalog_db \
  --from-literal=INVENTORY_DB_URL=postgresql://inventory_admin:inventory_password@inventory-db:5432/inventory_db \
  --from-literal=PAYMENT_DB_URL=postgresql://payment_admin:payment_password@payment-db:5432/payment_db \
  --from-literal=ORDER_DB_URL=postgresql://order_admin:order_password@order-db:5432/order_db

# 2. Apply Microservices Deployments & Services
kubectl apply -f k8s/

# 3. Verify Pods & Services Status
kubectl get pods -w
kubectl get svc
kubectl get ingress
```
