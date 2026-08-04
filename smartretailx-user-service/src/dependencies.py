from typing import Generator
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from smartretailx_common.exceptions import UnauthorizedException
from smartretailx_common.schemas import TokenPayload
from src.core.config import settings
from src.core.security import decode_user_token
from src.repositories.user_repository import UserRepository
from src.services.user_service import UserService

import time

def create_engine_with_retry(url: str):
    connect_args = {"check_same_thread": False} if url.startswith("sqlite") else {}
    for attempt in range(10):
        try:
            eng = create_engine(url, connect_args=connect_args, pool_pre_ping=True)
            with eng.connect():
                return eng
        except Exception:
            if url.startswith("sqlite") or attempt == 9:
                return create_engine(url, connect_args=connect_args, pool_pre_ping=True)
            time.sleep(2)

engine = create_engine_with_retry(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

def get_user_service(repo: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(repo)

def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenPayload:
    if not token:
        raise UnauthorizedException("Authentication token required")
    try:
        payload_dict = decode_user_token(token)
        return TokenPayload(**payload_dict)
    except Exception as e:
        raise UnauthorizedException(f"Invalid authentication token: {str(e)}")
