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

variable "gateway_lb_url" {
  description = "Target API Gateway ELB Hostname for Prometheus Scrape"
  type        = string
  default     = "a6092b15d115448dd84b4a98d7e7ccf0-985948391.us-east-1.elb.amazonaws.com"
}
