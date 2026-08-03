from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.get("/health")
def auth_health() -> dict[str, str]:
    return {"status": "auth-ready"}
