FROM python:3.11-slim

WORKDIR /app

# Copy shared library
COPY smartretailx-common /app/smartretailx-common
RUN pip install --no-cache-dir -e /app/smartretailx-common

# Copy service dependencies
COPY smartretailx-user-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy service application code
COPY smartretailx-user-service /app/smartretailx-user-service

WORKDIR /app/smartretailx-user-service

EXPOSE 8001

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001"]
