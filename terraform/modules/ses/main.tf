variable "environment" {
  type = string
}

# Amazon SES Email Identity for Notification Dispatch
resource "aws_ses_email_identity" "admin_email" {
  email = "admin@smartretailx.internal"
}

output "ses_email_identity_arn" {
  value = aws_ses_email_identity.admin_email.arn
}

output "ses_email" {
  value = aws_ses_email_identity.admin_email.email
}
