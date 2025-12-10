from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.schemas.vendor_schemas import VendorCreate, VendorOut, VendorUpdate
from app.services.vendor_service import create_vendor, get_all_vendors, update_vendor, delete_vendor

from app.db.database import get_db

router = APIRouter(tags=["Vendors"])

@router.get("/", response_model=list[VendorOut])

def list_vendors(db: Session = Depends(get_db)):
    return get_all_vendors(db)

@router.post("/", response_model=VendorOut)

def create_new_vendor(data: VendorCreate, db: Session = 
Depends(get_db)):
    return create_vendor(data, db)

@router.put("/{vendor_uid}", response_model=VendorOut)
def edit_vendor(vendor_uid: UUID, data: VendorUpdate, db: Session = Depends(get_db)):
    return update_vendor(vendor_uid,data, db)

@router.delete("/{vendor_uid}")
def remove_vendor(vendor_uid: UUID, db:Session = Depends(get_db)):
    return delete_vendor(vendor_uid, db)