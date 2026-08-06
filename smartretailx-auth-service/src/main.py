from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from src.config import settings
from src.database import engine, SessionLocal
from src.models.auth_user import Base, AuthUser
from src.routes.auth import router as auth_router
from src.utils.security import hash_password

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Dedicated Microservice for Authentication, Token Issuance, and RBAC Credentials Management",
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

# Instrument Prometheus Metrics
Instrumentator().instrument(app).expose(app)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    seed_admin_user()

def seed_admin_user():
    db = SessionLocal()
    try:
        existing = db.query(AuthUser).filter(AuthUser.email == "admin@smartretailx.com").first()
        if not existing:
            admin = AuthUser(
                email="admin@smartretailx.com",
                hashed_password=hash_password("admin123"),
                full_name="System Administrator",
                role="ADMIN",
                is_active=True
            )
            db.add(admin)
            db.commit()
            print("Seeded default admin user in auth_db: admin@smartretailx.com")
    except Exception as e:
        print(f"Error seeding admin user in auth_db: {e}")
        db.rollback()
    finally:
        db.close()

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "UP", "service": "smartretailx-auth-service"}

app.include_router(auth_router)
