output "sns_topic_arn" {
  value       = aws_sns_topic.notifications.arn
  description = "ARN of Amazon SNS Notifications Topic"
}

output "sqs_queue_url" {
  value       = aws_sqs_queue.orders_queue.id
  description = "URL of Amazon SQS Orders Queue"
}

output "sqs_queue_arn" {
  value       = aws_sqs_queue.orders_queue.arn
  description = "ARN of Amazon SQS Orders Queue"
}

output "sqs_dlq_arn" {
  value       = aws_sqs_queue.orders_dlq.arn
  description = "ARN of Amazon SQS Dead Letter Queue"
}
