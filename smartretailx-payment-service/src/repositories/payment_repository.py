from typing import Optional, List
from sqlalchemy.orm import Session
from src.models.payment import Payment

class PaymentRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, payment_id: int) -> Optional[Payment]:
        return self.db.query(Payment).filter(Payment.id == payment_id).first()

    def get_by_order_id(self, order_id: int) -> Optional[Payment]:
        return self.db.query(Payment).filter(Payment.order_id == order_id).first()

    def create(self, payment: Payment) -> Payment:
        self.db.add(payment)
        self.db.commit()
        self.db.refresh(payment)
        return payment

    def list_all(self, skip: int = 0, limit: int = 100) -> List[Payment]:
        return self.db.query(Payment).offset(skip).limit(limit).all()
