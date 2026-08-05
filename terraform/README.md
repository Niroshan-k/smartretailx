# SmartRetailX - Terraform Infrastructure as Code (IaC)

This directory contains production Terraform configurations for provisioning AWS infrastructure:
- **Networking**: AWS VPC, Multi-AZ Subnets, Route Tables, Security Groups.
- **Database Layer**: Amazon RDS PostgreSQL instances with automated random 24-character password generation.
- **Secrets Management**: AWS Secrets Manager storing production `DATABASE_URL` strings for dynamic Kubernetes secret injection.

## How Credentials are Managed (Zero Code Changes)

1. **No Application Code Changes Needed**:
   Our Python microservices read `DATABASE_URL` from environment variables via `pydantic-settings`.

2. **Terraform Flow**:
   - `terraform apply` provisions Amazon RDS for PostgreSQL.
   - Generates secure random passwords (`random_password`).
   - Writes the formatted connection string (`postgresql://user_admin:<RANDOM_PASS>@<RDS_ENDPOINT>:5432/user_db`) to **AWS Secrets Manager**.
   - AWS External Secrets Operator synchronizes the secret into Kubernetes pods automatically!

```bash
# Initialize & Preview Terraform
cd terraform
terraform init
terraform plan
```

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
    └── helm_prometheus/           # Helm provider module deploying kube-prometheus-stack into EKS

