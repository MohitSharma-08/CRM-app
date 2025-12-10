# app/schemas/auth_schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: Optional[int] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True
