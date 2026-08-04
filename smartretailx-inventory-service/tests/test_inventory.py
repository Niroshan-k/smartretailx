from src.schemas.inventory import StockDeductRequest

def test_stock_deduct_schema():
    req = StockDeductRequest(product_id=1, quantity=2)
    assert req.product_id == 1
    assert req.quantity == 2
