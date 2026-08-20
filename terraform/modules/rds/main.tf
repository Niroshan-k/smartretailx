resource "random_password" "db_password" {
  length  = 24
  special = false
}

resource "aws_db_subnet_group" "db_subnets" {
  name       = "smartretailx-db-subnet-group"
  subnet_ids = var.subnet_ids
}

resource "aws_security_group" "rds_sg" {
  name        = "smartretailx-rds-sg"
  description = "Allow PostgreSQL inbound from EKS microservices cluster"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Single Consolidated Free Tier Compliant RDS PostgreSQL Instance
resource "aws_db_instance" "main_postgres" {
  identifier             = "smartretailx-postgres"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "smartretailx_db"
  username               = "db_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# AWS Secrets Manager Secret storing Centralized Database Credentials
resource "aws_secretsmanager_secret" "db_secrets" {
  name_prefix             = "smartretailx/${var.environment}/db-secrets-"
  recovery_window_in_days = 0
}

resource "aws_secretsmanager_secret_version" "db_secrets_val" {
  secret_id = aws_secretsmanager_secret.db_secrets.id
  secret_string = jsonencode({
    USER_DB_URL      = "postgresql://db_admin:${random_password.db_password.result}@${aws_db_instance.main_postgres.endpoint}/smartretailx_db"
    CATALOG_DB_URL   = "postgresql://db_admin:${random_password.db_password.result}@${aws_db_instance.main_postgres.endpoint}/smartretailx_db"
    INVENTORY_DB_URL = "postgresql://db_admin:${random_password.db_password.result}@${aws_db_instance.main_postgres.endpoint}/smartretailx_db"
    PAYMENT_DB_URL   = "postgresql://db_admin:${random_password.db_password.result}@${aws_db_instance.main_postgres.endpoint}/smartretailx_db"
    ORDER_DB_URL     = "postgresql://db_admin:${random_password.db_password.result}@${aws_db_instance.main_postgres.endpoint}/smartretailx_db"
    AUTH_DB_URL      = "postgresql://db_admin:${random_password.db_password.result}@${aws_db_instance.main_postgres.endpoint}/smartretailx_db"
  })
}
