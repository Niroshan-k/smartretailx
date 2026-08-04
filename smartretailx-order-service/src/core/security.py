from typing import Dict, Any
from smartretailx_common.security import decode_access_token
from src.core.config import settings

def decode_user_token(token: str) -> Dict[str, Any]:
    return decode_access_token(token, secret_key=settings.SECRET_KEY)
