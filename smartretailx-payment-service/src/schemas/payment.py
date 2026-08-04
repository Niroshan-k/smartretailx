from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class ProcessPaymentRequest(BaseModel):
    order_id: int
    user_id: int
    amount: float
    currency: Optional[str] = "EUR"
    payment_method: Optional[str] = "CREDIT_CARD"

class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    transaction_id: str
    order_id: int
    user_id: int
    amount: float
    currency: str
    status: str
    payment_method: str
    created_at: datetime
