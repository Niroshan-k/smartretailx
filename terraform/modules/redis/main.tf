variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "environment" {
  type = string
}

# Redis Security Group restricting access to Port 6379 from VPC
resource "aws_security_group" "redis_sg" {
  name        = "smartretailx-redis-sg"
  description = "Security Group for ElastiCache Redis Caching Cluster"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "smartretailx-redis-sg"
    Environment = var.environment
  }
}

# ElastiCache Subnet Group
resource "aws_elasticache_subnet_group" "redis_subnets" {
  name       = "smartretailx-redis-subnet-group"
  subnet_ids = var.subnet_ids
}

# Amazon ElastiCache Redis Cluster
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "smartretailx-redis-cache"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis_subnets.name
  security_group_ids   = [aws_security_group.redis_sg.id]

  tags = {
    Name        = "smartretailx-redis-cache"
    Environment = var.environment
  }
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "redis_port" {
  value = aws_elasticache_cluster.redis.port
}
