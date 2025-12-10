import uuid
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base

class Vendor(Base):
    __tablename__ = "vendors"

    vendor_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    vendor_uid = Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, index=True)

    name = Column(String, nullable=False)
    agency = Column(String, nullable=False)
    location = Column(String, nullable=False)
    address = Column(String, nullable=False)
    gst = Column(String, nullable=False)
    pan = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
