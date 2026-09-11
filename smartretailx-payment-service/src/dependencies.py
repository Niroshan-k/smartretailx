from typing import Generator
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from src.core.config import settings
from src.repositories.payment_repository import PaymentRepository
from src.services.payment_service import PaymentService

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

from fastapi.security import OAuth2PasswordBearer
from smartretailx_common.exceptions import UnauthorizedException
from smartretailx_common.schemas import TokenPayload
from smartretailx_common.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_payment_repository(db: Session = Depends(get_db)) -> PaymentRepository:
    return PaymentRepository(db)

def get_payment_service(repo: PaymentRepository = Depends(get_payment_repository)) -> PaymentService:
    return PaymentService(repo)

def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenPayload:
    if not token:
        raise UnauthorizedException("Authentication token required for payment processing")
    try:
        payload_dict = decode_access_token(token, secret_key=settings.SECRET_KEY)
        return TokenPayload(**payload_dict)
    except Exception as e:
        raise UnauthorizedException(f"Invalid authentication token: {str(e)}")

