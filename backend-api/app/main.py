from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import auth, users, vendors
from app.core.events import create_start_app_handler, create_stop_app_handler

app = FastAPI()

origins = [
    "http://localhost:5173",   # your frontend origin
    "http://127.0.0.1:5173",   # optionally
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allow all origins (development)
    allow_credentials=False,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

app.include_router(auth.router, prefix="/api/v1/auth")
app.include_router(users.router, prefix="/api/v1/users")
app.include_router(vendors.router, prefix="/api/v1/vendors")

app.add_event_handler("startup", create_start_app_handler(app))
app.add_event_handler("shutdown", create_stop_app_handler(app))
