from typing import Optional, List
from sqlalchemy.orm import Session
from src.models.order import Order

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, order_id: int) -> Optional[Order]:
        return self.db.query(Order).filter(Order.id == order_id).first()

    def list_by_user(self, user_id: int) -> List[Order]:
        return self.db.query(Order).filter(Order.user_id == user_id).all()

    def list_all(self, skip: int = 0, limit: int = 100) -> List[Order]:
        return self.db.query(Order).offset(skip).limit(limit).all()

    def create(self, order: Order) -> Order:
        self.db.add(order)
        self.db.commit()
        self.db.refresh(order)
        return order

    def update_status(self, order_id: int, status: str) -> Optional[Order]:
        order = self.get_by_id(order_id)
        if order:
            order.status = status
            self.db.commit()
            self.db.refresh(order)
        return order
