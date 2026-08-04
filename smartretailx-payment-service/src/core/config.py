from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "smartretailx-payment-service"
    PORT: int = 8004
    DATABASE_URL: str = "postgresql://payment_admin:payment_password@payment_db:5432/payment_db"
    KAFKA_BOOTSTRAP_SERVERS: str = "redpanda:29092"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
