variable "aws_region" {
  description = "AWS Region for SmartRetailX infrastructure"
  type        = string
  default     = "eu-west-1"
}

variable "environment" {
  description = "Deployment Environment (staging / production)"
  type        = string
  default     = "production"
}

variable "db_instance_class" {
  description = "RDS Postgres Instance Class"
  type        = string
  default     = "db.t4g.micro"
}
