from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.models.vendor_model import Vendor
from app.schemas.vendor_schemas import VendorCreate, VendorUpdate
from app.core.security import hash_password
from uuid import UUID

def create_vendor(data: VendorCreate, db: Session):
    existing = db.query(Vendor).filter(Vendor.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Vendor already exists")

    vendor = Vendor(
        name=data.name,
        agency=data.agency,
        location=data.location,
        address=data.address,
        gst=data.gst,
        pan=data.pan,
        contact=data.contact,
        email=data.email,
        password=hash_password(data.password)
    )

    db.add(vendor)
    db.commit()
    db.refresh(vendor)

    return vendor

def get_all_vendors(db: Session):
    return db.query(Vendor).all()

def update_vendor(vendor_uid: UUID, data: VendorUpdate, db: Session):
    vendor = db.query(Vendor).filter(Vendor.vendor_uid == vendor_uid).first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    # Update only fields that are provided
    if data.name is not None:
        vendor.name = data.name
    if data.agency is not None:
        vendor.agency = data.agency
    if data.location is not None:
        vendor.location = data.location
    if data.address is not None:
        vendor.address = data.address
    if data.gst is not None:
        vendor.gst = data.gst
    if data.pan is not None:
        vendor.pan = data.pan
    if data.contact is not None:
        vendor.contact = data.contact
    if data.email is not None:
        existing = db.query(Vendor).filter(
            Vendor.email == data.email,
            Vendor.vendor_uid != vendor_uid
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
        vendor.email = data.email
    if data.password is not None:
        vendor.password = hash_password(data.password)

    db.commit()
    db.refresh(vendor)
    return vendor

def delete_vendor(vendor_uid: UUID, db:Session):
    vendor = db.query(Vendor).filter(Vendor.vendor_uid == vendor_uid).first()
    print("delete api hits")
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    db.delete(vendor)
    db.commit()

    return {"detail": f"Vemdor {vendor_uid} deleted successfully"}