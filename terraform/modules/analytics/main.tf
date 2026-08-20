variable "environment" {
  type = string
}

# 1. S3 Data Lake Bucket for AI & Business Analytics (Free Tier Compliant)
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "analytics_lake" {
  bucket        = "smartretailx-analytics-data-lake-${random_id.bucket_suffix.hex}"
  force_destroy = true

  tags = {
    Name        = "smartretailx-analytics-data-lake"
    Environment = var.environment
  }
}

# 2. Upload Pre-populated Fake Analytics Seed Data (JSON) for Athena SQL Queries
resource "aws_s3_object" "sample_orders_seed" {
  bucket       = aws_s3_bucket.analytics_lake.id
  key          = "raw_data/orders/sample_orders_seed.json"
  content_type = "application/json"
  content      = <<EOF
{"order_id":"ORD-9012","customer_id":"CUST-101","total_amount":149.99,"status":"COMPLETED","region":"EU-WEST","timestamp":"2026-08-19T10:15:00Z"}
{"order_id":"ORD-9013","customer_id":"CUST-102","total_amount":89.50,"status":"COMPLETED","region":"US-EAST","timestamp":"2026-08-19T10:16:30Z"}
{"order_id":"ORD-9014","customer_id":"CUST-103","total_amount":299.00,"status":"PROCESSING","region":"AP-SOUTH","timestamp":"2026-08-19T10:18:12Z"}
{"order_id":"ORD-9015","customer_id":"CUST-104","total_amount":45.20,"status":"COMPLETED","region":"EU-WEST","timestamp":"2026-08-19T10:20:45Z"}
{"order_id":"ORD-9016","customer_id":"CUST-105","total_amount":520.00,"status":"COMPLETED","region":"US-EAST","timestamp":"2026-08-19T10:22:10Z"}
EOF
}

# 3. AWS Glue Data Catalog Database
resource "aws_glue_catalog_database" "analytics_db" {
  name        = "smartretailx_analytics_db"
  description = "Glue Data Catalog for SmartRetailX Analytics & Athena SQL Queries"
}

# 4. Amazon Athena Workgroup & Query Results Bucket
resource "aws_s3_bucket" "athena_results" {
  bucket        = "smartretailx-athena-results-${random_id.bucket_suffix.hex}"
  force_destroy = true
}

resource "aws_athena_workgroup" "analytics_workgroup" {
  name = "smartretailx-athena-workgroup"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://${aws_s3_bucket.athena_results.bucket}/results/"
    }
  }

  tags = {
    Name        = "smartretailx-athena-workgroup"
    Environment = var.environment
  }
}

output "analytics_s3_bucket" {
  value = aws_s3_bucket.analytics_lake.bucket
}

output "glue_database_name" {
  value = aws_glue_catalog_database.analytics_db.name
}

output "athena_workgroup_name" {
  value = aws_athena_workgroup.analytics_workgroup.name
}
