FROM python:3.11-slim

WORKDIR /app

COPY smartretailx-common /app/smartretailx-common
RUN pip install --no-cache-dir -e /app/smartretailx-common

COPY smartretailx-catalog-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY smartretailx-catalog-service /app/smartretailx-catalog-service

WORKDIR /app/smartretailx-catalog-service

EXPOSE 8002

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8002"]
