from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    shipping_address: Optional[str] = "123 SmartRetailX Tech Park, Cloud City"

class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_id: int
    quantity: int
    unit_price: float

class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    status: str
    total_amount: float
    shipping_address: Optional[str]
    created_at: datetime
    items: List[OrderItemResponse]
