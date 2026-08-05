variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "sns_topic_arn" {
  description = "SNS Topic ARN for CloudWatch Alarm Notifications"
  type        = string
}
