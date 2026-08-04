# standard API response schemas

from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel, ConfigDict

T = TypeVar("T")

class StandardResponse(BaseModel, Generic[T]):
    model_config = ConfigDict(from_attributes=True)
    success: bool = True
    message: str = "Operation completed successfully"
    data: Optional[T] = None

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error_code: str
    details: Optional[Any] = None

class TokenPayload(BaseModel):
    sub: str
    user_id: int
    email: str
    role: str
    exp: Optional[int] = None
