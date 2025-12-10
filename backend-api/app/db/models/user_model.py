from sqlalchemy import Column, Integer, String
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    # IMPORTANT → match your existing service code
    password = Column(String, nullable=False)

    country = Column(String, nullable=True)
    state = Column(String, nullable=True)
    city = Column(String, nullable=True)

    phone_code = Column(String, nullable=True)
    phone = Column(String, nullable=True)
