from fastapi import APIRouter, Depends
from smartretailx_common.schemas import StandardResponse
from src.schemas.payment import ProcessPaymentRequest, PaymentResponse
from src.services.payment_service import PaymentService
from src.dependencies import get_payment_service

router = APIRouter(prefix="/api/v1/payments", tags=["Payments"])

@router.post("/process", response_model=StandardResponse[PaymentResponse])
def process_payment(req: ProcessPaymentRequest, service: PaymentService = Depends(get_payment_service)):
    payment = service.process_payment(req)
    return StandardResponse(success=True, message="Payment processed successfully", data=payment)

@router.get("/{payment_id}", response_model=StandardResponse[PaymentResponse])
def get_payment(payment_id: int, service: PaymentService = Depends(get_payment_service)):
    payment = service.get_payment_by_id(payment_id)
    return StandardResponse(success=True, message="Payment record found", data=payment)

@router.get("/order/{order_id}", response_model=StandardResponse[PaymentResponse])
def get_payment_by_order(order_id: int, service: PaymentService = Depends(get_payment_service)):
    payment = service.get_payment_by_order(order_id)
    return StandardResponse(success=True, message="Payment for order found", data=payment)
