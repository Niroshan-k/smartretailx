resource "aws_security_group" "monitoring_sg" {
  name        = "smartretailx-monitoring-sg"
  description = "Security Group for Grafana UI (3000) and Prometheus Server (9090)"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "smartretailx-monitoring-sg"
  }
}

resource "aws_instance" "monitoring_server" {
  ami                         = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.monitoring_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker.io docker-compose
              systemctl start docker
              systemctl enable docker

              mkdir -p /opt/monitoring
              cat << 'DOCKERCOMPOSE' > /opt/monitoring/docker-compose.yml
              version: '3.8'
              services:
                prometheus:
                  image: prom/prometheus:latest
                  ports:
                    - "9090:9090"
                  restart: always

                grafana:
                  image: grafana/grafana:latest
                  ports:
                    - "3000:3000"
                  environment:
                    - GF_SECURITY_ADMIN_PASSWORD=admin
                  restart: always
              DOCKERCOMPOSE

              cd /opt/monitoring && docker-compose up -d
              EOF

  tags = {
    Name        = "smartretailx-monitoring-ec2"
    Environment = var.environment
    Service     = "Grafana-Prometheus-UI"
  }
}
