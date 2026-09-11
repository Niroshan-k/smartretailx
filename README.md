# 🛒 SmartRetailX - Global Enterprise Cloud-Native Microservices Platform

**SmartRetailX** is an enterprise-grade, distributed e-commerce microservices platform engineered for high availability, zero-trust security, event-driven asynchronous processing, and cloud-native scalability on **AWS Elastic Kubernetes Service (EKS)**.

---

## 🏗️ Architecture & Technology Stack

![SmartRetailX System Architecture](diagram/Diagram.png)

### **Core Stack**
* **Microservices**: Python 3.11, FastAPI, SQLAlchemy ORM, Pydantic v2
* **Database & Caching**: Amazon RDS PostgreSQL (Database-per-service / Consolidated Multi-schema), Amazon ElastiCache Redis
* **Container Orchestration**: Kubernetes (AWS EKS), Helm (kube-prometheus-stack)
* **Event Streaming & Queues**: Redpanda (Kafka-compatible), AWS SNS, AWS SQS + Dead-Letter Queue (DLQ)
* **Infrastructure as Code (IaC)**: Terraform v1.x (Modularized: VPC, Private Subnets, EKS, RDS, ECR, WAF, SES, Analytics)
* **Security & Compliance**: OAuth 2.0 / JWT RBAC, AWS WAFv2 Managed Rules, Secrets Manager, Zero-Trust network policy
* **Analytics & Data Lake**: Amazon S3 Analytics Bucket, AWS Glue Data Catalog, Amazon Athena SQL Query Engine
* **Observability**: Prometheus, Grafana Telemetry Dashboard, AWS FluentBit CloudWatch Log Forwarder

---

## 📁 Repository Structure

```
.
├── smartretailx-auth-service/       # OAuth2/JWT Token Issuance & User Authentication
├── smartretailx-user-service/       # Customer Profile & RBAC Role Management
├── smartretailx-catalog-service/    # Product Catalog & Category Browsing
├── smartretailx-inventory-service/  # Warehouse Stock Management & SAGA Event Consumer
├── smartretailx-payment-service/    # Transaction Processing & Receipt Logging
├── smartretailx-order-service/      # Order Placement REST & Event Publisher
├── smartretailx-gateway/            # Nginx Reverse Proxy API Gateway
├── smartretailx-frontend/           # React (Vite) Single Page Application
├── smartretailx-common/             # Shared Security, Schemas, & Exceptions Python Package
├── k8s/                             # Production Kubernetes Manifests
├── terraform/                       # Infrastructure-as-Code Terraform Modules
├── diagram/                         # Cloud & System Architecture Diagrams
├── run_performance_test.py          # Python Benchmark & Latency Tester
├── smartretailx_jmeter_test.jmx     # Apache JMeter 1,000-User Stress Test Plan
└── docker-compose.yml               # Local Development Multi-Container Deployment
```

---

## 🚀 Quick Start - Local Development

### **Prerequisites**
- Docker & Docker Compose v2.x
- Python 3.11+

### **Run Full Microservices Stack via Docker Compose**
```bash
# Build and start all 8 containers locally
docker-compose up --build -d
```

### **Local Service Endpoints**
- **React Frontend**: `http://localhost:3000`
- **Nginx API Gateway**: `http://localhost:8080`
- **Auth Service OpenAPI Docs**: `http://localhost:8006/docs`
- **User Service OpenAPI Docs**: `http://localhost:8001/docs`
- **Catalog Service OpenAPI Docs**: `http://localhost:8002/docs`
- **Inventory Service OpenAPI Docs**: `http://localhost:8003/docs`
- **Payment Service OpenAPI Docs**: `http://localhost:8004/docs`
- **Order Service OpenAPI Docs**: `http://localhost:8005/docs`

---

## ☁️ Cloud Infrastructure Deployment (AWS EKS & Terraform)

### **1. Provision Cloud Infrastructure**
```bash
cd terraform
terraform init
terraform apply -auto-approve
```

### **2. Deploy Kubernetes Services**
```bash
# Connect local kubectl to AWS EKS Cluster
aws eks update-kubeconfig --name smartretailx-cluster --region us-east-1

# Deploy Microservices & Observability
kubectl apply -f k8s/
```

---

## 🧪 Performance & Stress Testing (Task 6)

### **Apache JMeter 1,000 Virtual User Stress Test**
```bash
# Execute JMeter in non-GUI mode and generate HTML Dashboard
jmeter -n -t smartretailx_jmeter_test.jmx -l jmeter_results.jtl -e -o jmeter_html_report
```

### **Python Multi-Threaded Latency Benchmark**
```bash
python run_performance_test.py
```

---

## 📄 License & Attribution
Developed for 3rd Year Cloud Engineering Microservices Assignment Submission. All rights reserved.
