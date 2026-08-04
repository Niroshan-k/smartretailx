from src.schemas.payment import ProcessPaymentRequest

def test_payment_request_schema():
    req = ProcessPaymentRequest(order_id=10, user_id=1, amount=99.99)
    assert req.order_id == 10
    assert req.amount == 99.99
    assert req.currency == "EUR"
