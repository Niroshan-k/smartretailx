output "secrets_manager_arn" {
  value = aws_secretsmanager_secret.db_secrets.arn
}

output "user_db_endpoint" {
  value = aws_db_instance.user_db.endpoint
}
