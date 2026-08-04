from datetime import datetime, timezone
import uuid
from typing import Dict, Any, List
from pydantic import BaseModel, Field

#kafka event definitions

class BaseEvent(BaseModel):
    event_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    version: str = "1.0"

class OrderItemSchema(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

class OrderCreatedEvent(BaseEvent):
    event_type: str = "OrderCreated"
    order_id: int
    user_id: int
    total_amount: float
    items: List[OrderItemSchema]

class PaymentProcessedEvent(BaseEvent):
    event_type: str = "PaymentProcessed"
    payment_id: int
    order_id: int
    status: str  # COMPLETED, FAILED
    amount: float

class InventoryUpdatedEvent(BaseEvent):
    event_type: str = "InventoryUpdated"
    product_id: int
    new_quantity: int
    reason: str
