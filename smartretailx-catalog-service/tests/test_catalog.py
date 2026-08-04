from src.schemas.product import ProductCreate

def test_product_create_schema():
    req = ProductCreate(
        sku="TEST-SKU-100",
        name="Test Laptop",
        description="A sample test item",
        price=499.99,
        category="Electronics"
    )
    assert req.sku == "TEST-SKU-100"
    assert req.price == 499.99
