variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for RDS Subnet Group"
  type        = list(string)
}

variable "db_instance_class" {
  description = "RDS Instance Class (Free Tier db.t3.micro)"
  type        = string
  default     = "db.t3.micro"
}
