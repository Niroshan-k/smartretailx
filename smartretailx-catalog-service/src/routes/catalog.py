from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from smartretailx_common.schemas import StandardResponse
from src.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from src.services.catalog_service import CatalogService
from src.dependencies import get_catalog_service

router = APIRouter(prefix="/api/v1/catalog", tags=["Product Catalog"])

@router.get("", response_model=StandardResponse[List[ProductResponse]])
def list_products(
    category: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    service: CatalogService = Depends(get_catalog_service)
):
    products = service.get_products(category=category, skip=skip, limit=limit)
    return StandardResponse(success=True, message="Products retrieved", data=products)

@router.get("/{product_id}", response_model=StandardResponse[ProductResponse])
def get_product(product_id: int, service: CatalogService = Depends(get_catalog_service)):
    product = service.get_product_by_id(product_id)
    return StandardResponse(success=True, message="Product details", data=product)

@router.post("", response_model=StandardResponse[ProductResponse], status_code=201)
def create_product(req: ProductCreate, service: CatalogService = Depends(get_catalog_service)):
    product = service.create_product(req)
    return StandardResponse(success=True, message="Product created successfully", data=product)

@router.put("/{product_id}", response_model=StandardResponse[ProductResponse])
def update_product(product_id: int, req: ProductUpdate, service: CatalogService = Depends(get_catalog_service)):
    product = service.update_product(product_id, req)
    return StandardResponse(success=True, message="Product updated successfully", data=product)

@router.delete("/{product_id}", response_model=StandardResponse[dict])
def delete_product(product_id: int, service: CatalogService = Depends(get_catalog_service)):
    service.delete_product(product_id)
    return StandardResponse(success=True, message="Product deleted successfully", data={"id": product_id})
