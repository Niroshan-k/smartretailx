from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class ProcessPaymentRequest(BaseModel):
    order_id: int
    user_id: Optional[int] = 1
    amount: float
    currency: Optional[str] = "USD"
    payment_method: Optional[str] = "CREDIT_CARD"
    card_number: Optional[str] = None
    card_token: Optional[str] = "tok_visa"
    exp_month: Optional[str] = None
    exp_year: Optional[str] = None
    cvv: Optional[str] = None

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
