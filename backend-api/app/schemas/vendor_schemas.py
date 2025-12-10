from pydantic import BaseModel
from uuid import UUID

class VendorBase(BaseModel):
    name: str
    agency: str
    location: str
    address: str
    gst: str
    pan: str
    contact: str
    email: str

class VendorCreate(VendorBase):
    password: str

class VendorOut(VendorBase):
    vendor_id: int
    vendor_uid: UUID  

class VendorUpdate(BaseModel):
    name: str | None = None
    agency: str | None = None
    location: str | None = None
    address: str | None = None
    gst: str | None = None
    pan: str | None = None
    contact: str | None = None
    email: str | None = None
    password: str | None = None

    class Config:
        orm_mode = True
