# AWS WAFv2 Web ACL for Application Load Balancer / API Security
resource "aws_wafv2_web_acl" "smartretailx_waf" {
  name        = "smartretailx-waf-acl"
  description = "SmartRetailX WAF Web ACL protecting API Gateway microservices"
  scope       = "REGIONAL"

  default_action {
    allow {}
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "smartretailxWafMetrics"
    sampled_requests_enabled   = true
  }

  # Managed Rule 1: Common Vulnerabilities (OWASP Top 10, XSS, SQLi)
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesCommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  # Managed Rule 2: Known Bad Inputs
  rule {
    name     = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesKnownBadInputsRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  tags = {
    Name        = "smartretailx-waf-acl"
    Environment = "production"
  }
}

output "waf_web_acl_arn" {
  value = aws_wafv2_web_acl.smartretailx_waf.arn
}
output "waf_web_acl_id" {
  value = aws_wafv2_web_acl.smartretailx_waf.id
}
