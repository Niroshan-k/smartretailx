## Pull request overview development to main: by copilot

This PR evolves SmartRetailX from a dev-focused setup toward a production-style deployment by introducing a modular AWS Terraform layout (VPC/EKS/RDS/etc.), adding a dedicated auth microservice, instrumenting services for Prometheus metrics, and redesigning the frontend into customer/admin portals backed by a gateway-style API service layer.

**Changes:**
- Modularized Terraform for AWS deployment (VPC, EKS, RDS+Secrets Manager, monitoring EC2, SNS/SQS, CloudWatch, S3 hosting) and added example tfvars + outputs.
- Added a new `smartretailx-auth-service` (JWT issuance, registration/login/verify) and updated gateway routing + docker-compose + k8s manifests accordingly.
- Added Prometheus instrumentation to multiple FastAPI services and delivered a substantially redesigned React UI for customer/admin experiences.

### Reviewed changes

Copilot reviewed 92 out of 93 changed files in this pull request and generated 15 comments.

<details>
<summary>Show a summary per file</summary>

| File | Description |
| ---- | ----------- |
| terraform/variables.tf | Updates defaults and adds new root inputs for modular infra. |
| terraform/terraform.tfvars.example | Adds an example variables file for Terraform usage. |
| terraform/README.md | Expands Terraform documentation and module descriptions. |
| terraform/rds.tf | Removes legacy non-modular RDS resources. |
| terraform/outputs.tf | Adds root outputs for created AWS resources and service endpoints. |
| terraform/modules/vpc/variables.tf | Introduces VPC module inputs. |
| terraform/modules/vpc/outputs.tf | Exposes VPC and subnet IDs from the VPC module. |
| terraform/modules/vpc/main.tf | Implements VPC + public subnets + IGW + public routing. |
| terraform/modules/sns_sqs/variables.tf | Adds environment input for SNS/SQS module. |
| terraform/modules/sns_sqs/outputs.tf | Exposes SNS topic and SQS queue identifiers. |
| terraform/modules/sns_sqs/main.tf | Creates SNS topic, SQS queue + DLQ, and subscription/policy. |
| terraform/modules/rds/variables.tf | Adds inputs for subnet group/VPC and instance sizing. |
| terraform/modules/rds/outputs.tf | Exposes Secrets Manager ARN and a DB endpoint. |
| terraform/modules/rds/main.tf | Provisions multiple RDS instances and stores URLs in Secrets Manager. |
| terraform/modules/monitoring_ec2/variables.tf | Adds inputs for monitoring EC2 instance and environment tagging. |
| terraform/modules/monitoring_ec2/outputs.tf | Exposes monitoring EC2 public IP and Grafana/Prometheus URLs. |
| terraform/modules/monitoring_ec2/main.tf | Provisions an EC2 instance running Grafana/Prometheus via docker-compose. |
| terraform/modules/helm_prometheus/variables.tf | Adds inputs for Helm-based monitoring stack. |
| terraform/modules/helm_prometheus/outputs.tf | Exposes namespace and Helm release name. |
| terraform/modules/helm_prometheus/main.tf | Installs kube-prometheus-stack via Helm into EKS. |
| terraform/modules/frontend_s3_cloudfront/variables.tf | Adds environment input for frontend hosting module. |
| terraform/modules/frontend_s3_cloudfront/outputs.tf | Exposes frontend hosting outputs (currently S3 website endpoint). |
| terraform/modules/frontend_s3_cloudfront/main.tf | Creates a public S3 bucket configured for static website hosting. |
| terraform/modules/eks/variables.tf | Adds EKS subnet and node instance type inputs. |
| terraform/modules/eks/outputs.tf | Exposes cluster name/endpoint/CA data. |
| terraform/modules/eks/main.tf | Provisions EKS cluster, IAM roles, and managed node group. |
| terraform/modules/ecr/variables.tf | Adds microservice list for ECR repo creation. |
| terraform/modules/ecr/outputs.tf | Outputs ECR repository URL map. |
| terraform/modules/ecr/main.tf | Creates ECR repositories with scan-on-push. |
| terraform/modules/cloudwatch/variables.tf | Adds environment + SNS topic inputs for alarms. |
| terraform/modules/cloudwatch/outputs.tf | Outputs log group names and alarm ARNs. |
| terraform/modules/cloudwatch/main.tf | Adds log groups and alarms for EC2/API GW/RDS metrics. |
| terraform/main.tf | Switches to a modular Terraform root, adds k8s/helm providers, wires modules. |
| terraform/.gitignore | Ignores Terraform state, tfvars, and other sensitive artifacts. |
| smartretailx-user-service/src/main.py | Adds Prometheus FastAPI instrumentation. |
| smartretailx-user-service/requirements.txt | Adds prometheus-fastapi-instrumentator dependency. |
| smartretailx-payment-service/src/services/payment_service.py | Adds basic card/CVV validation and simulated latency + USD defaults. |
| smartretailx-payment-service/src/schemas/payment.py | Expands payment request schema with card/token fields and updates defaults. |
| smartretailx-payment-service/src/main.py | Adds Prometheus FastAPI instrumentation. |
| smartretailx-payment-service/requirements.txt | Adds prometheus-fastapi-instrumentator dependency. |
| smartretailx-order-service/src/routes/orders.py | Adds optional user_id query handling for order create/list endpoints. |
| smartretailx-order-service/src/main.py | Adds Prometheus FastAPI instrumentation. |
| smartretailx-order-service/requirements.txt | Adds prometheus-fastapi-instrumentator dependency. |
| smartretailx-inventory-service/src/main.py | Adds Prometheus FastAPI instrumentation. |
| smartretailx-inventory-service/requirements.txt | Adds prometheus-fastapi-instrumentator dependency. |
| smartretailx-gateway/nginx.conf | Updates auth routing to auth-service and hides upstream CORS headers. |
| smartretailx-frontend/src/pages/CustomerPortal.jsx | Adds a customer portal layout with tabs/cart/checkout flow. |
| smartretailx-frontend/src/pages/AdminPortal.jsx | Adds an admin portal with telemetry/health/inventory/orders tabs. |
| smartretailx-frontend/src/index.css | Replaces styling with Daraz-like customer theme + admin dark theme. |
| smartretailx-frontend/src/components/customer/ShoppingCartView.jsx | Adds customer cart UI component. |
| smartretailx-frontend/src/components/customer/ProductCatalogGrid.jsx | Adds product grid UI for customer catalog browsing. |
| smartretailx-frontend/src/components/customer/PaymentCheckoutModal.jsx | Adds a checkout/payment modal UI. |
| smartretailx-frontend/src/components/customer/FlashSaleSection.jsx | Adds a flash sale section component for customer portal. |
| smartretailx-frontend/src/components/customer/CustomerOrdersView.jsx | Adds customer orders table view. |
| smartretailx-frontend/src/components/customer/CustomerHeader.jsx | Adds customer header with search and navigation actions. |
| smartretailx-frontend/src/components/customer/CategorySection.jsx | Adds customer category selector tiles. |
| smartretailx-frontend/src/components/common/NotificationToast.jsx | Adds toast notification UI component. |
| smartretailx-frontend/src/components/common/ImagePreviewModal.jsx | Adds image preview modal for admin catalog management. |
| smartretailx-frontend/src/components/auth/CustomerAuthModal.jsx | Adds customer login/register UI. |
| smartretailx-frontend/src/components/auth/AdminAuthTerminal.jsx | Adds admin login UI. |
| smartretailx-frontend/src/components/admin/SystemOverviewTab.jsx | Adds admin “system overview” dashboard tab UI. |
| smartretailx-frontend/src/components/admin/MicroserviceHealthTab.jsx | Adds admin microservice health and latency visualization UI. |
| smartretailx-frontend/src/components/admin/AdminSidebar.jsx | Adds admin sidebar navigation component. |
| smartretailx-frontend/src/components/admin/AdminProductsTab.jsx | Adds admin product listing and preview interactions. |
| smartretailx-frontend/src/components/admin/AdminOrdersTab.jsx | Adds admin global orders listing component. |
| smartretailx-frontend/src/components/admin/AdminInventoryTab.jsx | Adds admin inventory listing component. |
| smartretailx-frontend/src/components/admin/AddProductModal.jsx | Adds admin modal to create a new product. |
| smartretailx-frontend/src/App.jsx | Refactors app routing/state into portals, adds cart persistence and telemetry pings. |
| smartretailx-frontend/src/api/apiService.js | Adds a centralized API base + health endpoint list. |
| smartretailx-common/smartretailx_common/exceptions.py | Fixes typo and adds ConflictException. |
| smartretailx-catalog-service/src/main.py | Adds Prometheus FastAPI instrumentation. |
| smartretailx-catalog-service/requirements.txt | Adds prometheus-fastapi-instrumentator dependency. |
| smartretailx-auth-service/src/utils/security.py | Adds JWT/password hashing utilities for auth-service. |
| smartretailx-auth-service/src/services/auth_service.py | Implements register/login flows and token issuance. |
| smartretailx-auth-service/src/schemas/auth.py | Adds pydantic schemas for auth-service endpoints. |
| smartretailx-auth-service/src/routes/auth.py | Adds auth routes: register/login/verify. |
| smartretailx-auth-service/src/repositories/auth_repository.py | Adds SQLAlchemy repository layer for auth users. |
| smartretailx-auth-service/src/models/auth_user.py | Adds SQLAlchemy AuthUser model and table mapping. |
| smartretailx-auth-service/src/main.py | Adds auth-service FastAPI app + admin seeding + metrics. |
| smartretailx-auth-service/src/dependencies.py | Adds DI wiring for auth-service. |
| smartretailx-auth-service/src/database.py | Adds DB engine creation with retry and session generator. |
| smartretailx-auth-service/src/config.py | Adds auth-service settings including DB URL and JWT config. |
| smartretailx-auth-service/requirements.txt | Adds auth-service pinned dependencies including prometheus instrumentation. |
| smartretailx-auth-service/Dockerfile | Adds container build for auth-service. |
| k8s/user-service.yaml | Adds Prometheus scrape annotations. |
| k8s/payment-service.yaml | Adds Prometheus scrape annotations and env ordering adjustment. |
| k8s/order-service.yaml | Adds Prometheus scrape annotations and env ordering adjustment. |
| k8s/inventory-service.yaml | Adds Prometheus scrape annotations and env ordering adjustment. |
| k8s/catalog-service.yaml | Adds Prometheus scrape annotations. |
| k8s/auth-service.yaml | Adds Kubernetes deployment/service for the new auth-service. |
| docker-compose.yml | Adds auth_db + auth-service and wires gateway dependency. |
| .gitignore | Adds `security/` to ignore list. |
| .github/workflows/deploy.yml | Adds GitHub Actions pipeline to build/push images and deploy to EKS. |
</details>





<details>
<summary>Suppressed comments (4)</summary>

**terraform/README.md:60**
* This section states CloudFront is provisioned and provides a CloudFront URL, but the Terraform module shown in this PR does not create a CloudFront distribution (only S3 website hosting). Update the README to match the actual resources, or add CloudFront resources to the module.
**smartretailx-order-service/src/routes/orders.py:6**
* These endpoints accept an arbitrary `user_id` query param, which can allow a caller to create/list orders for other users unless explicitly restricted. If `user_id` is intended only for admins, enforce a role check and reject/ignore overrides from non-admin users.

This issue also appears in the following locations of the same file:
- line 11
- line 21
**smartretailx-order-service/src/routes/orders.py:19**
* `create_order` currently allows `user_id` override for any caller, which can enable cross-user order creation. Restrict overrides to admins (or remove the parameter) and default to `current_user.user_id`.
**smartretailx-order-service/src/routes/orders.py:29**
* `get_user_orders` currently allows `user_id` override for any caller, which can enable reading other users' orders. Restrict overrides to admins (or remove the parameter) and default to `current_user.user_id`.
</details>



---

💡 <a href="/Niroshan-k/smartretailx/new/main?filename=.github/instructions/*.instructions.md" class="Link--inTextBlock" target="_blank" rel="noopener noreferrer">Add Copilot custom instructions</a> for smarter, more guided reviews. <a href="https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot" class="Link--inTextBlock" target="_blank" rel="noopener noreferrer">Learn how to get started</a>.

terraform/modules/rds/main.tf [high]
```
resource "random_password" "db_password" {
  length  = 24
  special = false
}
```
All six RDS instances are using the same randomly generated password (`random_password.db_password`). That couples blast radius across databases (one leaked credential unlocks every DB) and makes rotation harder. Generate a distinct password per DB (e.g., separate `random_password` resources or a `for_each` map keyed by db name) and write per-DB URLs using the corresponding password.

terraform/modules/rds/main.tf [medium]
```
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
```
The RDS security group ingress CIDR is hard-coded to `10.0.0.0/16`, ignoring the root `vpc_cidr` variable. If the VPC CIDR is changed, RDS connectivity can break (or accidentally widen/narrow access). Prefer referencing the VPC CIDR via a module input, or (better) allow ingress from the EKS node/pod security group(s) instead of a CIDR block.

terraform/modules/monitoring_ec2/main.tf [high]
```
 ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
```
The monitoring EC2 security group opens Grafana (3000), Prometheus (9090), and SSH (22) to `0.0.0.0/0`. This exposes an admin surface directly to the internet. Restrict these ingress rules to trusted CIDRs (or a VPN/bastion), and consider removing direct SSH exposure in favor of SSM Session Manager.

terraform/modules/rds/main.tf [medium]
```
# AWS Secrets Manager for Centralized Database Credentials
resource "aws_secretsmanager_secret" "db_secrets" {
  name = "smartretailx/production/db-secrets"
}
```
The Secrets Manager secret name is hard-coded to `smartretailx/production/db-secrets`, even though the root module has an `environment` variable. This prevents safe parallel deployments (e.g., staging) and makes promotion workflows harder. Use an `environment` input to the module and include it in the secret name/path.

terraform/modules/monitoring_ec2/main.tf [high]
```
               grafana:
                  image: grafana/grafana:latest
                  ports:
                    - "3000:3000"
                  environment:
                    - GF_SECURITY_ADMIN_PASSWORD=admin
                  restart: always
              DOCKERCOMPOSE
```
Grafana is configured with a hard-coded admin password (`GF_SECURITY_ADMIN_PASSWORD=admin`) in user_data. This is a credential-in-code issue and will result in internet-exposed default credentials given the current security group rules. Pass a generated secret (e.g., from Secrets Manager / SSM Parameter Store) or at least inject via a sensitive Terraform variable and rotate it.

terraform/modules/frontend_s3_cloudfront/outputs.tf [medium]
```
output "s3_website_endpoint" {
  value       = "http://${aws_s3_bucket_website_configuration.website.website_endpoint}"
  description = "Direct S3 Website Endpoint URL"
}

output "cloudfront_domain_name" {
  value       = "http://${aws_s3_bucket_website_configuration.website.website_endpoint}"
  description = "S3 Static Web Hosting URL"
}
```
`cloudfront_domain_name` currently outputs the S3 website endpoint (and duplicates `s3_website_endpoint`), but this module does not create a CloudFront distribution. This makes the output name/description misleading and can break downstream expectations (root outputs/README mention CloudFront). Either add an `aws_cloudfront_distribution` and output its domain name, or rename/remove the CloudFront outputs and update call sites/docs accordingly.

terraform/modules/vpc/main.tf [medium]
```
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name                                        = "smartretailx-public-1"
    "kubernetes.io/role/elb"                    = "1"
    "kubernetes.io/cluster/smartretailx-cluster" = "shared"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
```
The public subnet CIDR blocks are hard-coded (`10.0.1.0/24`, `10.0.2.0/24`) even though the VPC CIDR is configurable via `var.vpc_cidr`. If `vpc_cidr` changes, these subnets may fall outside the VPC range or overlap unexpectedly. Consider deriving subnet CIDRs from `var.vpc_cidr` (e.g., `cidrsubnet`) or making subnet CIDRs module variables.

smartretailx-payment-service/src/services/payment_service.py [medium]
```
        # Simulate Bank Processing Latency (1 second)
        time.sleep(1.0)
```
`time.sleep(1.0)` blocks the request thread during payment processing, reducing throughput and increasing tail latency under load. If you need to model asynchronous bank processing, prefer an async workflow (queue/background job) or omit the sleep in production code.

smartretailx-payment-service/src/schemas/payment.py [low]
```
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from pydantic import BaseModel, ConfigDict, Field
```
`Field` is imported but not used in this schema module. Unused imports add noise and can trip linting.

smartretailx-auth-service/src/main.py [high]
```
 )
db.add(admin)
db.commit()
print("Seeded default admin user in auth_db: admin@smartretailx.com / admin123")
```
The startup seeding logs the default admin credentials (`admin@smartretailx.com / admin123`) to stdout. This can leak credentials into centralized logs. At minimum, avoid printing the password (and ideally gate seeding behind an explicit dev-only flag and pull the initial password from a secret).

smartretailx-auth-service/src/config.py [high]
```
class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartRetailX Auth Service"
    PORT: int = 8006
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user_admin:user_password@localhost:5437/auth_db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-key-change-in-production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
```

`JWT_SECRET` has an insecure hard-coded default. If this ever makes it into a deployed environment without an override, all tokens are trivially forgeable. Prefer making `JWT_SECRET` required (no default) and wiring it via a secret manager / deployment config (docker-compose, Kubernetes Secret, etc.).

smartretailx-frontend/src/components/customer/PaymentCheckoutModal.jsx [medium]

```
  const [cardNumber, setCardNumber] = useState('4532 8892 1049 8821');
  const [cardHolder, setCardHolder] = useState('Jane Doe');
  const [expDate, setExpDate] = useState('12/28');
  const [cvv, setCvv] = useState('882');
```
The payment modal pre-fills card number, cardholder name, expiry, and CVV. Even for demos, pre-populating sensitive fields is risky (screenshots/recordings) and can train unsafe behavior. Default these fields to empty and let the user enter values.

smartretailx-frontend/src/components/customer/CustomerHeader.jsx [low]
```
        <a href="#" className="daraz-logo" onClick={() => setActiveTab('catalog')}>
          <ShoppingBag size={28} color="#ffffff" />
          Smart<span style={{ color: '#212121' }}>RetailX</span>
        </a>
```
The logo is an `<a href="#">` without `preventDefault()`, so clicking it can cause an unnecessary hash navigation/jump. Also, since it behaves like a button, it should not trigger navigation. Prevent the default action (or use a `<button>`).

smartretailx-payment-service/src/services/payment_service.py [low]

```
if not re.match(r"^\d{13,19}$", clean_card):
    raise BadRequestException("Invalid credit card format. Must be 13 to 19 digits.")

# Validate Expiry format if provided
```

This comment says "Validate Expiry format" but the code below validates CVV. Update the comment so the validation intent is clear.