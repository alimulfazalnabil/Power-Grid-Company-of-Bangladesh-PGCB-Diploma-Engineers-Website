from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])


@router.get("/")
def dashboard_stats() -> dict[str, int]:
    return {"members": 1200, "committees": 18, "events": 9}
