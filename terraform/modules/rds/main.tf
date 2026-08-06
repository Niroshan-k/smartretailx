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

# 1. User DB (Encrypted at Rest)
resource "aws_db_instance" "user_db" {
  identifier             = "smartretailx-user-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "user_db"
  username               = "user_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# 2. Catalog DB (Encrypted at Rest)
resource "aws_db_instance" "catalog_db" {
  identifier             = "smartretailx-catalog-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "catalog_db"
  username               = "catalog_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# 3. Inventory DB (Encrypted at Rest)
resource "aws_db_instance" "inventory_db" {
  identifier             = "smartretailx-inventory-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "inventory_db"
  username               = "inventory_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# 4. Payment DB (Encrypted at Rest - PCI-DSS Compliance)
resource "aws_db_instance" "payment_db" {
  identifier             = "smartretailx-payment-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "payment_db"
  username               = "payment_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# 5. Order DB (Encrypted at Rest)
resource "aws_db_instance" "order_db" {
  identifier             = "smartretailx-order-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "order_db"
  username               = "order_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# 6. Auth DB (Encrypted at Rest)
resource "aws_db_instance" "auth_db" {
  identifier             = "smartretailx-auth-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_encrypted      = true
  db_name                = "auth_db"
  username               = "auth_admin"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# AWS Secrets Manager for Centralized Database Credentials
resource "aws_secretsmanager_secret" "db_secrets" {
  name_prefix = "smartretailx/${var.environment}/db-secrets-"
}

resource "aws_secretsmanager_secret_version" "db_secrets_val" {
  secret_id = aws_secretsmanager_secret.db_secrets.id
  secret_string = jsonencode({
    USER_DB_URL      = "postgresql://user_admin:${random_password.db_password.result}@${aws_db_instance.user_db.endpoint}/user_db"
    CATALOG_DB_URL   = "postgresql://catalog_admin:${random_password.db_password.result}@${aws_db_instance.catalog_db.endpoint}/catalog_db"
    INVENTORY_DB_URL = "postgresql://inventory_admin:${random_password.db_password.result}@${aws_db_instance.inventory_db.endpoint}/inventory_db"
    PAYMENT_DB_URL   = "postgresql://payment_admin:${random_password.db_password.result}@${aws_db_instance.payment_db.endpoint}/payment_db"
    ORDER_DB_URL     = "postgresql://order_admin:${random_password.db_password.result}@${aws_db_instance.order_db.endpoint}/order_db"
    AUTH_DB_URL      = "postgresql://auth_admin:${random_password.db_password.result}@${aws_db_instance.auth_db.endpoint}/auth_db"
  })
}
