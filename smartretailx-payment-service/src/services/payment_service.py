import uuid
import time
import re
from smartretailx_common.exceptions import BadRequestException, NotFoundException
from smartretailx_common.events import PaymentProcessedEvent
from src.repositories.payment_repository import PaymentRepository
from src.models.payment import Payment
from src.schemas.payment import ProcessPaymentRequest, PaymentResponse
from src.events.kafka_producer import publish_payment_event

class PaymentService:
    def __init__(self, repo: PaymentRepository):
        self.repo = repo

    def process_payment(self, req: ProcessPaymentRequest) -> PaymentResponse:
        # Validate Card Number format if provided
        if req.card_number:
            clean_card = req.card_number.replace(" ", "").replace("-", "")
            if not re.match(r"^\d{13,19}$", clean_card):
                raise BadRequestException("Invalid credit card format. Must be 13 to 19 digits.")

        # Validate Expiry format if provided
        if req.cvv and not re.match(r"^\d{3,4}$", req.cvv):
            raise BadRequestException("Invalid CVV format. Must be 3 or 4 digits.")

        # Check existing payment for order
        existing = self.repo.get_by_order_id(req.order_id)
        if existing and existing.status == "COMPLETED":
            return PaymentResponse.model_validate(existing)

        # Simulate Bank Processing Latency (1 second)
        time.sleep(1.0)

        txn_id = f"TXN-{uuid.uuid4().hex[:12].upper()}"
        payment = Payment(
            transaction_id=txn_id,
            order_id=req.order_id,
            user_id=req.user_id or 1,
            amount=req.amount,
            currency=req.currency or "USD",
            payment_method=req.payment_method or "CREDIT_CARD",
            status="COMPLETED"
        )
        saved = self.repo.create(payment)

        # Publish Kafka Event to Event Bus
        event = PaymentProcessedEvent(
            payment_id=saved.id,
            order_id=saved.order_id,
            status=saved.status,
            amount=saved.amount
        )
        publish_payment_event(event)

        return PaymentResponse.model_validate(saved)

    def get_payment_by_id(self, payment_id: int) -> PaymentResponse:
        payment = self.repo.get_by_id(payment_id)
        if not payment:
            raise NotFoundException(f"Payment record {payment_id} not found")
        return PaymentResponse.model_validate(payment)

    def get_payment_by_order(self, order_id: int) -> PaymentResponse:
        payment = self.repo.get_by_order_id(order_id)
        if not payment:
            raise NotFoundException(f"Payment for Order ID {order_id} not found")
        return PaymentResponse.model_validate(payment)
