from typing import Generator
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from src.core.config import settings
from src.repositories.catalog_repository import CatalogRepository
from src.services.catalog_service import CatalogService

import time

def create_engine_with_retry(url: str):
    connect_args = {"check_same_thread": False} if url.startswith("sqlite") else {}
    for attempt in range(10):
        try:
            eng = create_engine(url, connect_args=connect_args, pool_pre_ping=True)
            with eng.connect():
                return eng
        except Exception:
            if url.startswith("sqlite") or attempt == 9:
                return create_engine(url, connect_args=connect_args, pool_pre_ping=True)
            time.sleep(2)

engine = create_engine_with_retry(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_catalog_repository(db: Session = Depends(get_db)) -> CatalogRepository:
    return CatalogRepository(db)

def get_catalog_service(repo: CatalogRepository = Depends(get_catalog_repository)) -> CatalogService:
    return CatalogService(repo)
