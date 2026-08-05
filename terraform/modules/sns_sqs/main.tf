# Amazon SNS Topic for Order & Payment Notifications
resource "aws_sns_topic" "notifications" {
  name = "smartretailx-notifications-topic"

  tags = {
    Name        = "smartretailx-notifications"
    Environment = var.environment
  }
}

# Amazon SQS Dead Letter Queue (DLQ) for Failed Event Processing
resource "aws_sqs_queue" "orders_dlq" {
  name                      = "smartretailx-orders-dlq"
  message_retention_seconds = 1209600 # 14 Days

  tags = {
    Name        = "smartretailx-orders-dlq"
    Environment = var.environment
  }
}

# Amazon SQS Queue for Async Order Processing
resource "aws_sqs_queue" "orders_queue" {
  name                      = "smartretailx-orders-queue"
  delay_seconds             = 0
  max_message_size          = 262144 # 256 KB
  message_retention_seconds = 86400  # 1 Day
  receive_wait_time_seconds = 10     # Long polling enabled

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.orders_dlq.arn
    maxReceiveCount     = 5
  })

  tags = {
    Name        = "smartretailx-orders-queue"
    Environment = var.environment
  }
}

# SQS Queue Policy allowing SNS Topic to Publish Messages
resource "aws_sqs_queue_policy" "orders_queue_policy" {
  queue_url = aws_sqs_queue.orders_queue.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "sqs:SendMessage"
      Resource  = aws_sqs_queue.orders_queue.arn
      Condition = {
        ArnEquals = {
          "aws:SourceArn" = aws_sns_topic.notifications.arn
        }
      }
    }]
  })
}

# SNS to SQS Subscription
resource "aws_sns_topic_subscription" "sqs_subscription" {
  topic_arn = aws_sns_topic.notifications.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.orders_queue.arn
}
