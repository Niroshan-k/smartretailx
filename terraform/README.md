# SmartRetailX AWS Infrastructure as Code (Terraform)

This directory contains production-grade, modular Terraform code for deploying the SmartRetailX Commerce Platform to **AWS** while remaining strictly within the **AWS Free Tier / $100 Credit Budget**.

---

## Directory & Module Structure

```text
terraform/
├── .gitignore                     # Prevents committing .tfstate, secrets, or .pem files
├── README.md
├── main.tf                        # Root module calling nested modules & Helm provider
├── variables.tf                   # Root input variables
├── outputs.tf                     # Root output variables (Grafana URL, EKS Cluster, etc.)
├── terraform.tfvars.example       # Example variables template WITHOUT sensitive secrets
└── modules/
    ├── vpc/                       # AWS VPC & Multi-AZ Public Subnet module
    ├── ecr/                       # Amazon ECR Container Repositories module (scan_on_push: true)
    ├── rds/                       # 6 Amazon RDS PostgreSQL databases + AWS Secrets Manager
    ├── eks/                       # AWS EKS Kubernetes Cluster, Node Groups & IAM Roles module
    ├── monitoring_ec2/            # Dedicated EC2 Instance for Grafana UI & Prometheus Server
    ├── sns_sqs/                   # Amazon SNS Notifications Topic & SQS Orders Queue (with DLQ)
    ├── cloudwatch/                # CloudWatch Log Groups & Automated Metric Alarms (CPU, 5xx, Storage)
    └── helm_prometheus/           # Helm provider module deploying kube-prometheus-stack into EKS
```

---

## Architecture Components

1. **VPC Networking (`modules/vpc`)**:
   - Multi-AZ public subnets, Internet Gateway, and Route Tables.

2. **Amazon ECR (`modules/ecr`)**:
   - 7 Container Registries (`auth-service`, `user-service`, `catalog-service`, `inventory-service`, `payment-service`, `order-service`, `gateway`) with vulnerability scanning on push.

3. **Amazon RDS PostgreSQL (`modules/rds`)**:
   - 6 isolated PostgreSQL instances (`db.t3.micro` Free Tier eligible).
   - Automatically writes database connection strings to **AWS Secrets Manager**.

4. **Amazon EKS (`modules/eks`)**:
   - EKS Kubernetes Cluster (`smartretailx-cluster`) and Managed Node Group (`t3.small`).

5. **Dedicated Monitoring EC2 (`modules/monitoring_ec2`)**:
   - Automated Ubuntu EC2 instance (`t3.micro`) launching **Grafana** (Port `3000`) and **Prometheus** (Port `9090`) via Docker `user_data` on startup.

6. **Notification & Message Queue (`modules/sns_sqs`)**:
   - **Amazon SNS**: `smartretailx-notifications-topic` for event alerts.
   - **Amazon SQS**: `smartretailx-orders-queue` with a **Dead Letter Queue (DLQ)** (`smartretailx-orders-dlq`) for async message processing.

7. **Logging & Alarms (`modules/cloudwatch`)**:
   - Centralized CloudWatch Log Groups (`/aws/eks/smartretailx-cluster/logs`, `/aws/smartretailx/microservices`).
   - Automated Alarms for High CPU (>85%), API 5xx Errors (>5), and Low RDS Storage (<2GB).

8. **Helm Prometheus Operator (`modules/helm_prometheus`)**:
   - Deploys `kube-prometheus-stack` into EKS namespace `monitoring`.

---

## Usage

```bash
# Initialize & Preview Terraform Modules
cd terraform
terraform init
terraform plan

# Apply Infrastructure to AWS
terraform apply
```
