from pydantic_settings import BaseSettings
from datetime import timedelta

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:Mohit%409568@localhost:5432/CRM_Test_db"
    SECRET_KEY: str = "supersecret"
    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    # REFRESH_TOKEN_EXPIRE_DAYS = 7       # OPTIONAL 

settings = Settings()
