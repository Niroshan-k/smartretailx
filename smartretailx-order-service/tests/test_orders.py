from src.schemas.order import OrderCreate, OrderItemCreate

def test_order_create_schema():
    items = [OrderItemCreate(product_id=1, quantity=2, unit_price=10.0)]
    req = OrderCreate(items=items, shipping_address="123 Main St")
    assert len(req.items) == 1
    assert req.items[0].product_id == 1
    assert req.items[0].quantity * req.items[0].unit_price == 20.0
