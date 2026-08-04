from typing import List, Optional
from smartretailx_common.exceptions import NotFoundException, BadRequestException
from src.repositories.catalog_repository import CatalogRepository
from src.models.product import Product
from src.schemas.product import ProductCreate, ProductUpdate, ProductResponse

class CatalogService:
    def __init__(self, repo: CatalogRepository):
        self.repo = repo

    def get_products(self, category: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[ProductResponse]:
        products = self.repo.list_products(category=category, skip=skip, limit=limit)
        return [ProductResponse.model_validate(p) for p in products]

    def get_product_by_id(self, product_id: int) -> ProductResponse:
        product = self.repo.get_by_id(product_id)
        if not product:
            raise NotFoundException(f"Product with ID {product_id} not found")
        return ProductResponse.model_validate(product)

    def create_product(self, req: ProductCreate) -> ProductResponse:
        existing = self.repo.get_by_sku(req.sku)
        if existing:
            raise BadRequestException(f"Product with SKU '{req.sku}' already exists")
        
        product = Product(
            sku=req.sku,
            name=req.name,
            description=req.description,
            price=req.price,
            category=req.category,
            image_url=req.image_url
        )
        saved = self.repo.create(product)
        return ProductResponse.model_validate(saved)

    def update_product(self, product_id: int, req: ProductUpdate) -> ProductResponse:
        product = self.repo.get_by_id(product_id)
        if not product:
            raise NotFoundException(f"Product with ID {product_id} not found")

        if req.name is not None:
            product.name = req.name
        if req.description is not None:
            product.description = req.description
        if req.price is not None:
            product.price = req.price
        if req.category is not None:
            product.category = req.category
        if req.image_url is not None:
            product.image_url = req.image_url

        updated = self.repo.update(product)
        return ProductResponse.model_validate(updated)

    def delete_product(self, product_id: int) -> None:
        product = self.repo.get_by_id(product_id)
        if not product:
            raise NotFoundException(f"Product with ID {product_id} not found")
        self.repo.delete(product)
