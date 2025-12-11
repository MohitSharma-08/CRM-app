from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.db.models.user_model import User
from app.schemas.user_schemas import UserCreate, UserLogin, UserOut
from app.core.security import hash_password, verify_password 


def register_user(payload: UserCreate, db: Session) -> UserOut:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=payload.email,
        password=hash_password(payload.password),  # Changed to 'password'
        name=payload.name,
        country=payload.country,
        state=payload.state,
        city=payload.city,
        phone_code=payload.phone_code,
        phone=payload.phone
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return UserOut.from_orm(user)

def login_user(payload: UserLogin, db: Session) -> UserOut:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password):  # Use correct field name
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )

    return UserOut.from_orm(user)
