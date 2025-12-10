from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

async def connect_db():
    pass

async def disconnect_db():
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
