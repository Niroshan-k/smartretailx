output "vpc_id" {
  value       = module.vpc.vpc_id
  description = "Created VPC ID"
}

output "eks_cluster_name" {
  value       = module.eks.cluster_name
  description = "EKS Cluster Name"
}

output "eks_cluster_endpoint" {
  value       = module.eks.cluster_endpoint
  description = "EKS Cluster Endpoint URL"
}

output "ecr_repository_urls" {
  value       = module.ecr.repository_urls
  description = "Amazon ECR Repository URLs for microservices"
}

output "secrets_manager_arn" {
  value       = module.rds.secrets_manager_arn
  description = "ARN of AWS Secrets Manager storing DB credentials"
}

output "monitoring_server_public_ip" {
  value       = module.monitoring_ec2.public_ip
  description = "Public IP of dedicated Grafana & Prometheus EC2 Server"
}

output "grafana_url" {
  value       = module.monitoring_ec2.grafana_url
  description = "Grafana Web Dashboard URL"
}

output "prometheus_url" {
  value       = module.monitoring_ec2.prometheus_url
  description = "Prometheus Metrics Server URL"
}

output "sns_notifications_topic_arn" {
  value       = module.sns_sqs.sns_topic_arn
  description = "Amazon SNS Topic ARN for Notifications"
}

output "sqs_orders_queue_url" {
  value       = module.sns_sqs.sqs_queue_url
  description = "Amazon SQS Orders Queue URL"
}

output "cloudwatch_eks_log_group" {
  value       = module.cloudwatch.eks_log_group_name
  description = "Centralized CloudWatch EKS Log Group"
}

output "cloudwatch_high_cpu_alarm_arn" {
  value       = module.cloudwatch.high_cpu_alarm_arn
  description = "CloudWatch High CPU Alarm ARN"
}

output "frontend_s3_bucket" {
  value       = module.frontend_s3_cloudfront.s3_bucket_name
  description = "Amazon S3 Bucket Name hosting React Frontend"
}

output "frontend_cloudfront_url" {
  value       = module.frontend_s3_cloudfront.cloudfront_domain_name
  description = "Global CloudFront CDN Domain Name for Frontend (HTTPS)"
}

output "prometheus_helm_namespace" {
  value       = module.helm_prometheus.namespace
  description = "Kubernetes namespace for Prometheus Helm release"
}

output "nat_gateway_ip" {
  value       = module.vpc.nat_gateway_ip
  description = "Elastic Public IP of AWS NAT Gateway"
}

output "redis_endpoint" {
  value       = module.redis.redis_endpoint
  description = "Amazon ElastiCache Redis Cluster Endpoint URL"
}

output "ses_email" {
  value       = module.ses.ses_email
  description = "Amazon SES Verified Email Identity"
}

output "analytics_s3_bucket" {
  value       = module.analytics.analytics_s3_bucket
  description = "Amazon S3 Data Lake Analytics Bucket Name"
}

output "glue_database_name" {
  value       = module.analytics.glue_database_name
  description = "AWS Glue Data Catalog Database Name"
}

output "athena_workgroup_name" {
  value       = module.analytics.athena_workgroup_name
  description = "Amazon Athena Workgroup Name"
}


