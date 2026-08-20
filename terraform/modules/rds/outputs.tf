output "secrets_manager_arn" {
  value = aws_secretsmanager_secret.db_secrets.arn
}

output "rds_endpoint" {
  value = aws_db_instance.main_postgres.endpoint
}
