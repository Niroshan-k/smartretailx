from typing import Optional, List
from sqlalchemy.orm import Session
from src.models.product import Product

class CatalogRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, product_id: int) -> Optional[Product]:
        return self.db.query(Product).filter(Product.id == product_id).first()

    def get_by_sku(self, sku: str) -> Optional[Product]:
        return self.db.query(Product).filter(Product.sku == sku).first()

    def list_products(self, category: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[Product]:
        query = self.db.query(Product)
        if category:
            query = query.filter(Product.category == category)
        return query.offset(skip).limit(limit).all()

    def create(self, product: Product) -> Product:
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def update(self, product: Product) -> Product:
        self.db.commit()
        self.db.refresh(product)
        return product

    def delete(self, product: Product) -> None:
        self.db.delete(product)
        self.db.commit()
