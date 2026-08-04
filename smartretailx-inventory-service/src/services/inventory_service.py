from typing import List
from smartretailx_common.exceptions import NotFoundException, BadRequestException
from src.repositories.inventory_repository import InventoryRepository
from src.models.inventory import InventoryItem
from src.schemas.inventory import InventoryResponse, InventoryUpdate, StockDeductRequest

class InventoryService:
    def __init__(self, repo: InventoryRepository):
        self.repo = repo

    def get_all_inventory(self, skip: int = 0, limit: int = 100) -> List[InventoryResponse]:
        items = self.repo.list_all(skip=skip, limit=limit)
        return [InventoryResponse.model_validate(i) for i in items]

    def get_stock(self, product_id: int) -> InventoryResponse:
        item = self.repo.get_by_product_id(product_id)
        if not item:
            # Auto-create stock record if none exists for prototype ease
            item = InventoryItem(product_id=product_id, available_quantity=100, reserved_quantity=0)
            item = self.repo.create_or_update(item)
        return InventoryResponse.model_validate(item)

    def set_stock(self, product_id: int, req: InventoryUpdate) -> InventoryResponse:
        item = self.repo.get_by_product_id(product_id)
        if not item:
            item = InventoryItem(product_id=product_id, available_quantity=req.available_quantity, location=req.location)
        else:
            item.available_quantity = req.available_quantity
            item.location = req.location
        saved = self.repo.create_or_update(item)
        return InventoryResponse.model_validate(saved)

    def deduct_stock(self, req: StockDeductRequest) -> InventoryResponse:
        item = self.repo.get_by_product_id(req.product_id)
        if not item:
            item = InventoryItem(product_id=req.product_id, available_quantity=100, reserved_quantity=0)
            self.repo.create_or_update(item)
        
        if item.available_quantity < req.quantity:
            raise BadRequestException(f"Insufficient stock for Product ID {req.product_id}. Available: {item.available_quantity}, Requested: {req.quantity}")

        item.available_quantity -= req.quantity
        saved = self.repo.create_or_update(item)
        return InventoryResponse.model_validate(saved)
