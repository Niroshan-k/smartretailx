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

output "prometheus_helm_namespace" {
  value       = module.helm_prometheus.namespace
  description = "Kubernetes namespace for Prometheus Helm release"
}
