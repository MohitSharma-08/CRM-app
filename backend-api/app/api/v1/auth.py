# app/api/v1/auth.py
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user_schemas import UserCreate, UserOut, UserLogin
from app.services.user__service import register_user, login_user
from app.db.database import get_db

router = APIRouter()


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db=Depends(get_db)):
    try:
        return register_user(user, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(user: UserLogin, db=Depends(get_db)):
    return login_user(user, db)
