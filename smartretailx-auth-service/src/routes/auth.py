from fastapi import APIRouter, Depends, Header
from smartretailx_common.schemas import StandardResponse
from src.schemas.auth import UserRegister, UserLogin, UserResponse, TokenResponse
from src.services.auth_service import AuthService
from src.dependencies import get_auth_service
from src.utils.security import decode_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication Service"])

@router.post("/register", response_model=StandardResponse[UserResponse], status_code=201)
def register(req: UserRegister, service: AuthService = Depends(get_auth_service)):
    user = service.register(req)
    return StandardResponse(success=True, message="Customer registered successfully", data=user)

@router.post("/login", response_model=StandardResponse[TokenResponse])
def login(req: UserLogin, service: AuthService = Depends(get_auth_service)):
    token_resp = service.login(req)
    return StandardResponse(success=True, message="Authentication successful", data=token_resp)

@router.get("/verify", response_model=StandardResponse[dict])
def verify_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        return StandardResponse(success=False, message="Invalid authorization header", data=None)
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        return StandardResponse(success=False, message="Token expired or invalid", data=None)
    return StandardResponse(success=True, message="Token valid", data=payload)
