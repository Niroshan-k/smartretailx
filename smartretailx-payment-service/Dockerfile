FROM python:3.11-slim

WORKDIR /app

COPY smartretailx-common /app/smartretailx-common
RUN pip install --no-cache-dir -e /app/smartretailx-common

COPY smartretailx-payment-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY smartretailx-payment-service /app/smartretailx-payment-service

WORKDIR /app/smartretailx-payment-service

EXPOSE 8004

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8004"]
