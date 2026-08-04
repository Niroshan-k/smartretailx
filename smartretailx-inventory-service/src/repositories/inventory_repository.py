from typing import Optional, List
from sqlalchemy.orm import Session
from src.models.inventory import InventoryItem

class InventoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_product_id(self, product_id: int) -> Optional[InventoryItem]:
        return self.db.query(InventoryItem).filter(InventoryItem.product_id == product_id).first()

    def list_all(self, skip: int = 0, limit: int = 100) -> List[InventoryItem]:
        return self.db.query(InventoryItem).offset(skip).limit(limit).all()

    def create_or_update(self, item: InventoryItem) -> InventoryItem:
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item
