import datetime
from typing import Dict, Any, Optional
from smartretailx_common.security import (
    verify_password as verify_pwd,
    get_password_hash as hash_pwd,
    create_access_token as create_token,
    decode_access_token as decode_token
)
from src.core.config import settings

def verify_password(plain: str, hashed: str) -> bool:
    return verify_pwd(plain, hashed)

def get_password_hash(password: str) -> str:
    return hash_pwd(password)

def create_user_access_token(user_id: int, email: str, role: str) -> str:
    payload = {
        "sub": email,
        "user_id": user_id,
        "email": email,
        "role": role
    }
    expires = datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return create_token(payload, secret_key=settings.SECRET_KEY, expires_delta=expires)

def decode_user_token(token: str) -> Dict[str, Any]:
    return decode_token(token, secret_key=settings.SECRET_KEY)
