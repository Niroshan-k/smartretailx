from typing import Optional
from sqlalchemy.orm import Session
from src.models.auth_user import AuthUser

class AuthRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> Optional[AuthUser]:
        return self.db.query(AuthUser).filter(AuthUser.email == email).first()

    def get_by_id(self, user_id: int) -> Optional[AuthUser]:
        return self.db.query(AuthUser).filter(AuthUser.id == user_id).first()

    def create(self, user: AuthUser) -> AuthUser:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
