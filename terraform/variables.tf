variable "aws_region" {
  description = "AWS Region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment (production/staging)"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "VPC Network CIDR Block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_instance_class" {
  description = "RDS PostgreSQL Instance Class (Free Tier eligible db.t3.micro)"
  type        = string
  default     = "db.t3.micro"
}

variable "monitoring_instance_type" {
  description = "Dedicated EC2 Instance Type for Grafana UI (Free Tier eligible t3.micro)"
  type        = string
  default     = "t3.micro"
}

variable "node_instance_types" {
  description = "EKS Worker Node Instance Types"
  type        = list(string)
  default     = ["t3.small"]
}

variable "service_names" {
  description = "List of SmartRetailX Microservices"
  type        = list(string)
  default     = ["auth-service", "user-service", "catalog-service", "inventory-service", "payment-service", "order-service", "gateway"]
}
