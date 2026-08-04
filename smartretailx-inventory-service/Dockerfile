FROM python:3.11-slim

WORKDIR /app

COPY smartretailx-common /app/smartretailx-common
RUN pip install --no-cache-dir -e /app/smartretailx-common

COPY smartretailx-inventory-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY smartretailx-inventory-service /app/smartretailx-inventory-service

WORKDIR /app/smartretailx-inventory-service

EXPOSE 8003

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8003"]
