from smartretailx_common.exceptions import BadRequestException, UnauthorizedException, ConflictException
from src.repositories.auth_repository import AuthRepository
from src.models.auth_user import AuthUser
from src.schemas.auth import UserRegister, UserLogin, UserResponse, TokenResponse
from src.utils.security import hash_password, verify_password, create_access_token

class AuthService:
    def __init__(self, repo: AuthRepository):
        self.repo = repo

    def register(self, req: UserRegister) -> UserResponse:
        existing = self.repo.get_by_email(req.email)
        if existing:
            raise ConflictException(f"User with email {req.email} already exists")

        # Public registrations are forced to CUSTOMER role
        role = "CUSTOMER"
        user = AuthUser(
            email=req.email,
            hashed_password=hash_password(req.password),
            full_name=req.full_name,
            role=role
        )
        saved = self.repo.create(user)
        return UserResponse(
            user_id=saved.id,
            email=saved.email,
            full_name=saved.full_name,
            role=saved.role,
            is_active=saved.is_active,
            created_at=saved.created_at
        )

    def login(self, req: UserLogin) -> TokenResponse:
        user = self.repo.get_by_email(req.email)
        if not user or not verify_password(req.password, user.hashed_password):
            raise UnauthorizedException("Invalid email or password")

        if not user.is_active:
            raise UnauthorizedException("User account is inactive")

        token_payload = {
            "sub": str(user.id),
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        }
        token = create_access_token(token_payload)

        u_resp = UserResponse(
            user_id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at
        )
        return TokenResponse(access_token=token, user=u_resp)
