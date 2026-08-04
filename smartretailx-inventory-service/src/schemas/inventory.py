from datetime import datetime
from pydantic import BaseModel, ConfigDict

class InventoryUpdate(BaseModel):
    available_quantity: int
    location: str = "Main Warehouse EU"

class StockDeductRequest(BaseModel):
    product_id: int
    quantity: int

class InventoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_id: int
    available_quantity: int
    reserved_quantity: int
    location: str
    updated_at: datetime
