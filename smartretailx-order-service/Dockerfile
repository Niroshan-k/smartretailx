FROM python:3.11-slim

WORKDIR /app

COPY smartretailx-common /app/smartretailx-common
RUN pip install --no-cache-dir -e /app/smartretailx-common

COPY smartretailx-order-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY smartretailx-order-service /app/smartretailx-order-service

WORKDIR /app/smartretailx-order-service

EXPOSE 8005

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8005"]
