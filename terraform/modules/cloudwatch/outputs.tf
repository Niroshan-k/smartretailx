output "eks_log_group_name" {
  value       = aws_cloudwatch_log_group.eks_cluster_logs.name
  description = "EKS Cluster CloudWatch Log Group"
}

output "microservices_log_group_name" {
  value       = aws_cloudwatch_log_group.microservice_logs.name
  description = "Microservices Centralized CloudWatch Log Group"
}

output "high_cpu_alarm_arn" {
  value       = aws_cloudwatch_metric_alarm.high_cpu_alarm.arn
  description = "High CPU CloudWatch Alarm ARN"
}

output "api_5xx_alarm_arn" {
  value       = aws_cloudwatch_metric_alarm.api_5xx_alarm.arn
  description = "API 5xx Server Error Alarm ARN"
}
