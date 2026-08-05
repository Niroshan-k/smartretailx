# Centralized CloudWatch Log Groups for Container & Platform Logs
resource "aws_cloudwatch_log_group" "eks_cluster_logs" {
  name              = "/aws/eks/smartretailx-cluster/logs"
  retention_in_days = 30

  tags = {
    Name        = "smartretailx-eks-logs"
    Environment = var.environment
  }
}

resource "aws_cloudwatch_log_group" "microservice_logs" {
  name              = "/aws/smartretailx/microservices"
  retention_in_days = 30

  tags = {
    Name        = "smartretailx-microservices-logs"
    Environment = var.environment
  }
}

# CloudWatch Alarm: High EKS Worker Node CPU Utilization (> 85%)
resource "aws_cloudwatch_metric_alarm" "high_cpu_alarm" {
  alarm_name          = "smartretailx-high-cpu-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 85
  alarm_description   = "Triggered when EKS worker node CPU utilization exceeds 85%"
  alarm_actions       = [var.sns_topic_arn]

  tags = {
    Environment = var.environment
  }
}

# CloudWatch Alarm: API Gateway 5xx Server Error Spikes (> 5 errors in 5 min)
resource "aws_cloudwatch_metric_alarm" "api_5xx_alarm" {
  alarm_name          = "smartretailx-api-5xx-error-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "5XXError"
  namespace           = "AWS/ApiGateway"
  period              = 300
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "Triggered when API Gateway encounters more than 5 5xx server errors"
  alarm_actions       = [var.sns_topic_arn]

  tags = {
    Environment = var.environment
  }
}

# CloudWatch Alarm: RDS Low Free Storage Space (< 2 GB)
resource "aws_cloudwatch_metric_alarm" "rds_low_storage_alarm" {
  alarm_name          = "smartretailx-rds-low-storage-alarm"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  period              = 300
  statistic           = "Average"
  threshold           = 2147483648 # 2 GB in bytes
  alarm_description   = "Triggered when RDS PostgreSQL free storage space falls below 2 GB"
  alarm_actions       = [var.sns_topic_arn]

  tags = {
    Environment = var.environment
  }
}
