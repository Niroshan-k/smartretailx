from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class ProductCreate(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    price: float
    category: str
    image_url: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None

class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    sku: str
    name: str
    description: Optional[str]
    price: float
    category: str
    image_url: Optional[str]
    created_at: datetime
