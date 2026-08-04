# Generate Secure Random Passwords for PostgreSQL Databases
resource "random_password" "user_db_password" {
  length  = 24
  special = false
}

resource "random_password" "catalog_db_password" {
  length  = 24
  special = false
}

# RDS Security Group
resource "aws_security_group" "rds_sg" {
  name        = "smartretailx-rds-sg"
  description = "Allow PostgreSQL inbound from EKS microservices cluster"
  vpc_id      = aws_vpc.main.id

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

# 1. Amazon RDS PostgreSQL - User Management DB
resource "aws_db_instance" "user_db" {
  identifier             = "smartretailx-user-db"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  db_name                = "user_db"
  username               = "user_admin"
  password               = random_password.user_db_password.result
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# 2. Store Database Credentials securely in AWS Secrets Manager
resource "aws_secretsmanager_secret" "user_db_secret" {
  name = "smartretailx/production/user-db-url"
}

resource "aws_secretsmanager_secret_version" "user_db_secret_val" {
  secret_id = aws_secretsmanager_secret.user_db_secret.id
  secret_string = jsonencode({
    DATABASE_URL = "postgresql://${aws_db_instance.user_db.username}:${random_password.user_db_password.result}@${aws_db_instance.user_db.endpoint}/${aws_db_instance.user_db.db_name}"
  })
}
