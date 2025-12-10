from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.db.models.user_model import User   # adjust if your model path differs
from app.schemas.user_schemas import UserCreate, UserLogin
from app.core.security import hash_password, verify_password


def register_user(data: UserCreate, db: Session):

    # Check if email already exists
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pass = hash_password(data.password)

    user = User(
        name=data.name,
        email=data.email,
        password=hashed_pass,
        country=data.country,
        state=data.state,
        city=data.city,
        phone_code=data.phone_code,
        phone=data.phone,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(data: UserLogin, db: Session):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return user
