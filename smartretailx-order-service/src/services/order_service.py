import httpx
from typing import List
from smartretailx_common.exceptions import BadRequestException, NotFoundException
from smartretailx_common.events import OrderCreatedEvent, OrderItemSchema
from src.core.config import settings
from src.core.logging import logger
from src.repositories.order_repository import OrderRepository
from src.models.order import Order, OrderItem
from src.schemas.order import OrderCreate, OrderResponse
from src.events.kafka_producer import publish_order_created_event

class OrderService:
    def __init__(self, repo: OrderRepository):
        self.repo = repo

    def create_order(self, user_id: int, req: OrderCreate) -> OrderResponse:
        if not req.items:
            raise BadRequestException("Order must contain at least one item")

        total_amount = sum(item.quantity * item.unit_price for item in req.items)
        
        order = Order(
            user_id=user_id,
            status="PENDING",
            total_amount=total_amount,
            shipping_address=req.shipping_address
        )
        
        for item_req in req.items:
            order_item = OrderItem(
                product_id=item_req.product_id,
                quantity=item_req.quantity,
                unit_price=item_req.unit_price
            )
            order.items.append(order_item)

        saved = self.repo.create(order)

        # 1. Publish OrderCreated Event to Kafka for async inventory deduction
        event_items = [
            OrderItemSchema(product_id=i.product_id, quantity=i.quantity, unit_price=i.unit_price)
            for i in saved.items
        ]
        kafka_event = OrderCreatedEvent(
            order_id=saved.id,
            user_id=saved.user_id,
            total_amount=saved.total_amount,
            items=event_items
        )
        publish_order_created_event(kafka_event)

        # 2. Trigger Payment Service REST API
        try:
            with httpx.Client(timeout=5.0) as client:
                pay_resp = client.post(
                    f"{settings.PAYMENT_SERVICE_URL}/api/v1/payments/process",
                    json={
                        "order_id": saved.id,
                        "user_id": saved.user_id,
                        "amount": saved.total_amount,
                        "currency": "EUR"
                    }
                )
                if pay_resp.status_code == 200:
                    self.repo.update_status(saved.id, "COMPLETED")
                    logger.info(f"Payment processed successfully for Order {saved.id}")
                else:
                    logger.warning(f"Payment response status {pay_resp.status_code} for Order {saved.id}")
        except Exception as e:
            logger.warning(f"Direct Payment HTTP call skipped/deferred: {e}")
            self.repo.update_status(saved.id, "PROCESSING")

        updated = self.repo.get_by_id(saved.id)
        return OrderResponse.model_validate(updated)

    def get_order_by_id(self, order_id: int) -> OrderResponse:
        order = self.repo.get_by_id(order_id)
        if not order:
            raise NotFoundException(f"Order ID {order_id} not found")
        return OrderResponse.model_validate(order)

    def list_user_orders(self, user_id: int) -> List[OrderResponse]:
        orders = self.repo.list_by_user(user_id)
        return [OrderResponse.model_validate(o) for o in orders]

    def list_all_orders(self, skip: int = 0, limit: int = 100) -> List[OrderResponse]:
        orders = self.repo.list_all(skip=skip, limit=limit)
        return [OrderResponse.model_validate(o) for o in orders]
