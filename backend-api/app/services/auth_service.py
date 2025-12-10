# app/services/auth_service.py
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from app.db.models.user_model import User  # your SQLAlchemy model
from app.core.security import verify_password, create_access_token
# from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """
    Returns the User if credentials are valid, else None.
    Adapt query if your user table/fields differ.
    """
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def make_jwt_payload(user: User) -> Dict[str, Any]:
    return {"sub": str(user.id), "email": user.email}



# def create_login_response_for_user(user: User) -> dict:
#     """
#     Returns a payload dict to put into JWT. Keep sub as user id string.
#     """
#     payload = {"sub": str(user.id), "email": user.email}
#     return payload
