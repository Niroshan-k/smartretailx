variable "subnet_ids" {
  description = "Subnet IDs for EKS Cluster & Node Group"
  type        = list(string)
}

variable "node_instance_types" {
  description = "Worker node instance types"
  type        = list(string)
  default     = ["t3.small"]
}
