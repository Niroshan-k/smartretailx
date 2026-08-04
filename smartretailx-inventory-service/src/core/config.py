from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "smartretailx-inventory-service"
    PORT: int = 8003
    DATABASE_URL: str = "postgresql://inventory_admin:inventory_password@inventory_db:5432/inventory_db"
    KAFKA_BOOTSTRAP_SERVERS: str = "redpanda:29092"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
