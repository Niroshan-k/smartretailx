import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.config import settings

def create_engine_with_retry(url, retries=10, delay=3):
    for i in range(retries):
        try:
            engine = create_engine(url, pool_pre_ping=True)
            conn = engine.connect()
            conn.close()
            return engine
        except Exception as e:
            if i == retries - 1:
                raise e
            time.sleep(delay)

engine = create_engine_with_retry(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
