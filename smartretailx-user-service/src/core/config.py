from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "smartretailx-user-service"
    PORT: int = 8001
    DATABASE_URL: str = "postgresql://user_admin:user_password@user_db:5432/user_db"
    SECRET_KEY: str = "smartretailx-super-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
