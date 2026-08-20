variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "environment" {
  type = string
}

# Elastic IPs for NLB Static Public IP Addresses
resource "aws_eip" "nlb_eip_1" {
  domain = "vpc"
  tags = {
    Name = "smartretailx-nlb-eip-1"
  }
}

resource "aws_eip" "nlb_eip_2" {
  domain = "vpc"
  tags = {
    Name = "smartretailx-nlb-eip-2"
  }
}

# Network Load Balancer (NLB) for Static IP Ingress
resource "aws_lb" "nlb" {
  name               = "smartretailx-nlb"
  internal           = false
  load_balancer_type = "network"

  subnet_mapping {
    subnet_id     = var.subnet_ids[0]
    allocation_id = aws_eip.nlb_eip_1.id
  }

  subnet_mapping {
    subnet_id     = var.subnet_ids[1]
    allocation_id = aws_eip.nlb_eip_2.id
  }

  tags = {
    Name        = "smartretailx-nlb"
    Environment = var.environment
  }
}

# NLB Target Group forwarding to ALB / Nginx Gateway
resource "aws_lb_target_group" "nlb_target_group" {
  name        = "smartretailx-nlb-tg"
  port        = 80
  protocol    = "TCP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    protocol            = "HTTP"
    port                = "80"
    path                = "/health"
    interval            = 30
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name        = "smartretailx-nlb-tg"
    Environment = var.environment
  }
}

# NLB Listener on Port 80
resource "aws_lb_listener" "nlb_listener" {
  load_balancer_arn = aws_lb.nlb.arn
  port              = 80
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb_target_group.arn
  }
}

output "nlb_dns_name" {
  value = aws_lb.nlb.dns_name
}

output "nlb_static_ips" {
  value = [aws_eip.nlb_eip_1.public_ip, aws_eip.nlb_eip_2.public_ip]
}
