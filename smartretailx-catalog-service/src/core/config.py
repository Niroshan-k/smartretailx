from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "smartretailx-catalog-service"
    PORT: int = 8002
    DATABASE_URL: str = "postgresql://catalog_admin:catalog_password@catalog_db:5432/catalog_db"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
