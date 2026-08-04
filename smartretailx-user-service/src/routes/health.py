from fastapi import APIRouter
from src.core.config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": settings.SERVICE_NAME,
        "environment": settings.ENVIRONMENT
    }
