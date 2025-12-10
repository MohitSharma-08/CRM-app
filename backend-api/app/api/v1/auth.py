from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Optional

from app.schemas.user_schemas import UserCreate, UserOut, UserLogin
from app.services.user__service import register_user
from app.services.auth_service import authenticate_user, make_jwt_payload
from app.db.database import get_db
from app.core.security import create_access_token, decode_token
from app.core.config import settings

router = APIRouter()


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return register_user(user, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=UserOut)
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    auth_user = authenticate_user(db, user.email, user.password)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    jwt_payload = make_jwt_payload(auth_user)
    expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(jwt_payload, expires_delta=expires)

# setting http-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=int(expires.total_seconds()),
        path="/",
    )

    return UserOut.from_orm(auth_user)


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"detail": "Logged out"}


def _get_token_from_request(request: Request) -> Optional[str]:
    token = request.cookies.get("access_token")
    if token:
        return token
    auth = request.headers.get("Authorization")
    if auth and auth.startswith("Bearer "):
        return auth.split(" ", 1)[1]
    return None


@router.get("/me", response_model=UserOut)
def get_me(request: Request, db: Session = Depends(get_db)):
    token = _get_token_from_request(request)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    payload = decode_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    try:
        user_id = int(payload["sub"])
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token subject")

    from app.db.models.user_model import User
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return UserOut.from_orm(user)
