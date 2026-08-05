terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.24"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. VPC Module
module "vpc" {
  source      = "./modules/vpc"
  aws_region  = var.aws_region
  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

# 2. ECR Container Repositories Module
module "ecr" {
  source        = "./modules/ecr"
  service_names = var.service_names
}

# 3. RDS PostgreSQL Databases & Secrets Manager Module
module "rds" {
  source            = "./modules/rds"
  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.public_subnet_ids
  db_instance_class = var.db_instance_class
}

# 4. EKS Kubernetes Cluster Module
module "eks" {
  source              = "./modules/eks"
  subnet_ids          = module.vpc.public_subnet_ids
  node_instance_types = var.node_instance_types
}

# 5. Dedicated EC2 Monitoring Server for Grafana UI Module
module "monitoring_ec2" {
  source        = "./modules/monitoring_ec2"
  vpc_id        = module.vpc.vpc_id
  subnet_id     = module.vpc.public_subnet_1_id
  instance_type = var.monitoring_instance_type
  environment   = var.environment
}

# Kubernetes Provider Configuration for Helm Provider
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

# Helm Provider Configuration for Prometheus Stack
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}

# 6. Helm Prometheus Operator Stack Module
module "helm_prometheus" {
  source       = "./modules/helm_prometheus"
  cluster_name = module.eks.cluster_name
  depends_on   = [module.eks]
}
