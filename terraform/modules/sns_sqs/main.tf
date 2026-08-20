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

# AWS Lambda IAM Role
resource "aws_iam_role" "lambda_role" {
  name = "smartretailx-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

resource "aws_iam_role_policy_attachment" "lambda_sqs_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

# Package Lambda function source code into ZIP archive
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda_function.py"
  output_path = "${path.module}/lambda_function.zip"
}

# AWS Lambda Serverless Function
resource "aws_lambda_function" "order_notification_worker" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "smartretailx-sqs-notification-worker"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.11"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  tags = {
    Name        = "smartretailx-sqs-notification-worker"
    Environment = var.environment
  }
}

# Lambda SQS Event Source Mapping
resource "aws_lambda_event_source_mapping" "sqs_lambda_trigger" {
  event_source_arn = aws_sqs_queue.orders_queue.arn
  function_name    = aws_lambda_function.order_notification_worker.arn
  batch_size       = 5
}

