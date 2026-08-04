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
