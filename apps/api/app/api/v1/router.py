from fastapi import APIRouter

from app.api.v1.endpoints import notices
from app.api.v1.endpoints import sliders

api_router = APIRouter()

api_router.include_router(sliders.router)
api_router.include_router(notices.router)