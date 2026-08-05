from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from smartretailx_common.exceptions import SmartRetailXException
from src.core.config import settings
from src.core.logging import logger
from src.exception_handlers import smartretailx_exception_handler
from src.models.user import Base, User
from src.core.security import get_password_hash
from src.dependencies import engine, SessionLocal
from src.routes import auth, users, health

# Create database tables automatically on startup
Base.metadata.create_all(bind=engine)

def seed_admin_user():
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == "admin@smartretailx.com").first()
        if not existing:
            admin_user = User(
                email="admin@smartretailx.com",
                hashed_password=get_password_hash("admin123"),
                full_name="System Administrator",
                role="ADMIN",
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            logger.info("Seeded default admin user: admin@smartretailx.com")
    except Exception as e:
        logger.warning(f"Admin seeding warning: {e}")
    finally:
        db.close()

seed_admin_user()

app = FastAPI(
    title="SmartRetailX - User Management Service",
    description="Microservice responsible for authentication, JWT issuance, and RBAC user profile management.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Instrument Prometheus Metrics
Instrumentator().instrument(app).expose(app)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register exception handlers
app.add_exception_handler(SmartRetailXException, smartretailx_exception_handler)

# Include Routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(users.router)

@app.on_event("startup")
def startup_event():
    logger.info(f"Started {settings.SERVICE_NAME} on port {settings.PORT}")
