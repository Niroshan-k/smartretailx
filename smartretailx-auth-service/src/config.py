import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartRetailX Auth Service"
    PORT: int = 8006
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user_admin:user_password@localhost:5437/auth_db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "smartretailx-super-secret-key-change-in-production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

settings = Settings()
