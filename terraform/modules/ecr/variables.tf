variable "service_names" {
  description = "List of microservices to create ECR repositories for"
  type        = list(string)
  default     = ["auth-service", "user-service", "catalog-service", "inventory-service", "payment-service", "order-service", "gateway"]
}
