import uuid
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
        existing = self.repo.get_by_order_id(req.order_id)
        if existing and existing.status == "COMPLETED":
            return PaymentResponse.model_validate(existing)

        txn_id = f"TXN-{uuid.uuid4().hex[:12].upper()}"
        payment = Payment(
            transaction_id=txn_id,
            order_id=req.order_id,
            user_id=req.user_id,
            amount=req.amount,
            currency=req.currency or "EUR",
            payment_method=req.payment_method or "CREDIT_CARD",
            status="COMPLETED"
        )
        saved = self.repo.create(payment)

        # Publish Kafka Event
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
