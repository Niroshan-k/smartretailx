output "s3_bucket_name" {
  value       = aws_s3_bucket.frontend.id
  description = "Name of Amazon S3 Bucket hosting React frontend static files"
}

output "s3_website_endpoint" {
  value       = "http://${aws_s3_bucket_website_configuration.website.website_endpoint}"
  description = "Direct S3 Website Endpoint URL"
}

output "cloudfront_domain_name" {
  value       = "http://${aws_s3_bucket_website_configuration.website.website_endpoint}"
  description = "S3 Static Web Hosting URL"
}
