from fastapi import APIRouter, Depends
from smartretailx_common.schemas import StandardResponse
from src.schemas.user import UserRegisterRequest, UserLoginRequest, UserResponse, TokenResponse
from src.services.user_service import UserService
from src.dependencies import get_user_service

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

@router.post("/register", response_model=StandardResponse[UserResponse])
def register(req: UserRegisterRequest, service: UserService = Depends(get_user_service)):
    user = service.register_user(req)
    return StandardResponse(success=True, message="User registered successfully", data=user)

@router.post("/login", response_model=StandardResponse[TokenResponse])
def login(req: UserLoginRequest, service: UserService = Depends(get_user_service)):
    token_resp = service.login_user(req)
    return StandardResponse(success=True, message="Login successful", data=token_resp)
