from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from smartretailx_common.schemas import StandardResponse, TokenPayload
from src.schemas.order import OrderCreate, OrderResponse
from src.services.order_service import OrderService
from src.dependencies import get_order_service, get_current_user

router = APIRouter(prefix="/api/v1/orders", tags=["Order Processing"])

@router.post("", response_model=StandardResponse[OrderResponse], status_code=201)
def create_order(
    req: OrderCreate,
    user_id: Optional[int] = Query(None),
    current_user: TokenPayload = Depends(get_current_user),
    service: OrderService = Depends(get_order_service)
):
    target_user_id = user_id or (current_user.user_id if current_user else 1)
    order = service.create_order(target_user_id, req)
    return StandardResponse(success=True, message="Order created successfully", data=order)

@router.get("", response_model=StandardResponse[List[OrderResponse]])
def get_user_orders(
    user_id: Optional[int] = Query(None),
    current_user: TokenPayload = Depends(get_current_user),
    service: OrderService = Depends(get_order_service)
):
    target_user_id = user_id or (current_user.user_id if current_user else 1)
    orders = service.list_user_orders(target_user_id)
    return StandardResponse(success=True, message="User orders retrieved", data=orders)

@router.get("/all", response_model=StandardResponse[List[OrderResponse]])
def list_all_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    service: OrderService = Depends(get_order_service)
):
    orders = service.list_all_orders(skip=skip, limit=limit)
    return StandardResponse(success=True, message="All platform orders retrieved", data=orders)

@router.get("/{order_id}", response_model=StandardResponse[OrderResponse])
def get_order_by_id(order_id: int, service: OrderService = Depends(get_order_service)):
    order = service.get_order_by_id(order_id)
    return StandardResponse(success=True, message="Order details retrieved", data=order)
