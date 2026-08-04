from typing import List
from fastapi import APIRouter, Depends, Query
from smartretailx_common.schemas import StandardResponse
from src.schemas.inventory import InventoryResponse, InventoryUpdate, StockDeductRequest
from src.services.inventory_service import InventoryService
from src.dependencies import get_inventory_service

router = APIRouter(prefix="/api/v1/inventory", tags=["Inventory Management"])

@router.get("", response_model=StandardResponse[List[InventoryResponse]])
def list_all_inventory(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    service: InventoryService = Depends(get_inventory_service)
):
    items = service.get_all_inventory(skip=skip, limit=limit)
    return StandardResponse(success=True, message="Inventory records retrieved", data=items)

@router.get("/{product_id}", response_model=StandardResponse[InventoryResponse])
def get_stock(product_id: int, service: InventoryService = Depends(get_inventory_service)):
    item = service.get_stock(product_id)
    return StandardResponse(success=True, message="Stock info retrieved", data=item)

@router.put("/{product_id}", response_model=StandardResponse[InventoryResponse])
def set_stock(product_id: int, req: InventoryUpdate, service: InventoryService = Depends(get_inventory_service)):
    item = service.set_stock(product_id, req)
    return StandardResponse(success=True, message="Stock level updated", data=item)

@router.post("/deduct", response_model=StandardResponse[InventoryResponse])
def deduct_stock(req: StockDeductRequest, service: InventoryService = Depends(get_inventory_service)):
    item = service.deduct_stock(req)
    return StandardResponse(success=True, message="Stock deducted successfully", data=item)
