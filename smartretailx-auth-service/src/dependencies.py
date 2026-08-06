from fastapi import Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.repositories.auth_repository import AuthRepository
from src.services.auth_service import AuthService

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    repo = AuthRepository(db)
    return AuthService(repo)
