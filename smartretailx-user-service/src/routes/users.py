from fastapi import APIRouter, Depends
from smartretailx_common.schemas import StandardResponse, TokenPayload
from src.schemas.user import UserResponse
from src.services.user_service import UserService
from src.dependencies import get_user_service, get_current_user

router = APIRouter(prefix="/api/v1/users", tags=["Users"])

@router.get("/me", response_model=StandardResponse[UserResponse])
def get_current_user_profile(
    current_user: TokenPayload = Depends(get_current_user),
    service: UserService = Depends(get_user_service)
):
    user = service.get_user_by_id(current_user.user_id)
    return StandardResponse(success=True, message="Profile retrieved", data=user)

@router.get("/{user_id}", response_model=StandardResponse[UserResponse])
def get_user_by_id(
    user_id: int,
    current_user: TokenPayload = Depends(get_current_user),
    service: UserService = Depends(get_user_service)
):
    user = service.get_user_by_id(user_id)
    return StandardResponse(success=True, message="User found", data=user)
