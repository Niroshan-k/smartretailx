from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "smartretailx-order-service"
    PORT: int = 8005
    DATABASE_URL: str = "postgresql://order_admin:order_password@order_db:5432/order_db"
    KAFKA_BOOTSTRAP_SERVERS: str = "redpanda:29092"
    CATALOG_SERVICE_URL: str = "http://catalog-service:8002"
    PAYMENT_SERVICE_URL: str = "http://payment-service:8004"
    INVENTORY_SERVICE_URL: str = "http://inventory-service:8003"
    SECRET_KEY: str = "smartretailx-super-secret-key-change-in-production"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
