output "namespace" {
  value = kubernetes_namespace.monitoring.metadata[0].name
}

output "release_name" {
  value = helm_release.prometheus_stack.name
}
