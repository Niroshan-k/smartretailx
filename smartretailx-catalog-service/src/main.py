from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from smartretailx_common.exceptions import SmartRetailXException
from src.core.config import settings
from src.core.logging import logger
from src.exception_handlers import smartretailx_exception_handler
from src.models.product import Base, Product
from src.dependencies import engine, SessionLocal
from src.routes import catalog, health

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SmartRetailX - Product Catalogue Service",
    description="Microservice responsible for managing global product inventory items, categories, and pricing.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(SmartRetailXException, smartretailx_exception_handler)

app.include_router(health.router)
app.include_router(catalog.router)

def seed_sample_products():
    db = SessionLocal()
    try:
        if db.query(Product).count() == 0:
            sample_items = [
                Product(sku="ELEC-LAP-001", name="ProBook Cloud Laptop 15\"", description="High performance cloud developer laptop", price=1299.99, category="Electronics", image_url="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"),
                Product(sku="ELEC-PHONE-002", name="SmartPhone X1", description="5G Flagship smartphone with OLED display", price=899.50, category="Electronics", image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"),
                Product(sku="HOME-COFFEE-003", name="Espresso Master Pro", description="Automatic coffee machine with milk frother", price=349.00, category="Home & Kitchen", image_url="https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?w=500"),
                Product(sku="FASH-JACKET-004", name="WeatherProof Winter Jacket", description="Warm insulated jacket for cold weather", price=149.95, category="Fashion", image_url="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"),
                Product(sku="SPORT-WATCH-005", name="FitTrack GPS Smartwatch", description="Waterproof fitness tracker with heart rate monitor", price=199.00, category="Sports", image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500")
            ]
            db.add_all(sample_items)
            db.commit()
            logger.info("Seeded initial catalog products.")
    except Exception as e:
        logger.error(f"Error seeding products: {e}")
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    seed_sample_products()
    logger.info(f"Started {settings.SERVICE_NAME} on port {settings.PORT}")
