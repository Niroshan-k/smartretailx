data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

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
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.monitoring_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker.io
              systemctl start docker
              systemctl enable docker

              mkdir -p /opt/monitoring/provisioning/datasources
              mkdir -p /opt/monitoring/provisioning/dashboards
              mkdir -p /opt/monitoring/dashboards

              cat << 'PROMETHEUSCONF' > /opt/monitoring/prometheus.yml
              global:
                scrape_interval: 5s

              scrape_configs:
                - job_name: 'prometheus'
                  static_configs:
                    - targets: ['localhost:9090']

                - job_name: 'gateway-service'
                  metrics_path: '/health'
                  static_configs:
                    - targets: ['a6092b15d115448dd84b4a98d7e7ccf0-985948391.us-east-1.elb.amazonaws.com']

                - job_name: 'catalog-service'
                  metrics_path: '/api/v1/catalog'
                  static_configs:
                    - targets: ['a6092b15d115448dd84b4a98d7e7ccf0-985948391.us-east-1.elb.amazonaws.com']

                - job_name: 'inventory-service'
                  metrics_path: '/api/v1/inventory'
                  static_configs:
                    - targets: ['a6092b15d115448dd84b4a98d7e7ccf0-985948391.us-east-1.elb.amazonaws.com']

                - job_name: 'order-service'
                  metrics_path: '/api/v1/orders'
                  static_configs:
                    - targets: ['a6092b15d115448dd84b4a98d7e7ccf0-985948391.us-east-1.elb.amazonaws.com']
              PROMETHEUSCONF

              cat << 'DATASOURCES' > /opt/monitoring/provisioning/datasources/datasources.yml
              apiVersion: 1

              datasources:
                - name: Prometheus
                  type: prometheus
                  access: proxy
                  url: http://172.17.0.1:9090
                  isDefault: true
                  editable: true

                - name: CloudWatch
                  type: cloudwatch
                  access: proxy
                  jsonData:
                    authType: keys
                    defaultRegion: us-east-1
                  secureJsonData:
                    accessKey: YOUR_AWS_ACCESS_KEY_ID
                    secretKey: YOUR_AWS_SECRET_ACCESS_KEY
                  editable: true
              DATASOURCES

              cat << 'DASHBOARDPROV' > /opt/monitoring/provisioning/dashboards/dashboards.yml
              apiVersion: 1

              providers:
                - name: 'SmartRetailX'
                  orgId: 1
                  folder: ''
                  type: file
                  disableDeletion: false
                  editable: true
                  options:
                    path: /opt/monitoring/dashboards
              DASHBOARDPROV

              docker run -d --name prometheus --restart=always -p 9090:9090 -v /opt/monitoring/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus:latest
              docker run -d --name grafana --restart=always -p 3000:3000 -e "GF_SECURITY_ADMIN_USER=admin" -e "GF_SECURITY_ADMIN_PASSWORD=admin" -v /opt/monitoring/provisioning:/etc/grafana/provisioning -v /opt/monitoring/dashboards:/opt/monitoring/dashboards grafana/grafana:latest
              EOF

  tags = {
    Name        = "smartretailx-monitoring-ec2"
    Environment = var.environment
    Service     = "Grafana-Prometheus-UI"
  }
}
