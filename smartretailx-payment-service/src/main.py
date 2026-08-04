from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from smartretailx_common.exceptions import SmartRetailXException
from src.core.config import settings
from src.core.logging import logger
from src.exception_handlers import smartretailx_exception_handler
from src.models.payment import Base
from src.dependencies import engine
from src.routes import payments, health

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SmartRetailX - Payment Service",
    description="Microservice responsible for processing transactions, receipts, and emitting Kafka payment events.",
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
app.include_router(payments.router)

@app.on_event("startup")
def startup_event():
    logger.info(f"Started {settings.SERVICE_NAME} on port {settings.PORT}")
