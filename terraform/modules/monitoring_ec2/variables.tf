variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID for Monitoring EC2"
  type        = string
}

variable "instance_type" {
  description = "EC2 Instance type (Free Tier t3.micro)"
  type        = string
  default     = "t3.micro"
}

variable "environment" {
  description = "Environment tag"
  type        = string
  default     = "production"
}
