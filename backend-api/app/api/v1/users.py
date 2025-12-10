from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user_schemas import UserCreate, UserLogin
from app.services.user__service import register_user, login_user

router = APIRouter()

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = register_user(data, db)
    return {"message": "User registered successfully", "user": user}


@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = login_user(data, db)
    return {"message": "Login successful", "user": user}


