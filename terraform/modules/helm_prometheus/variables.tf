variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
}

variable "helm_release_name" {
  description = "Helm release name for Prometheus stack"
  type        = string
  default     = "kube-prometheus-stack"
}

variable "namespace" {
  description = "Kubernetes namespace for monitoring stack"
  type        = string
  default     = "monitoring"
}
