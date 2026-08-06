FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy shared library
COPY smartretailx-common /app/smartretailx-common
RUN pip install --no-cache-dir -e /app/smartretailx-common

# Copy service dependencies
COPY smartretailx-auth-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy service application code
COPY smartretailx-auth-service /app/smartretailx-auth-service

WORKDIR /app/smartretailx-auth-service

EXPOSE 8006

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8006"]
