from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/notices", tags=["notices"])


@router.get("/")
def list_notices() -> list[dict[str, str]]:
    return [{"title": "Holiday Notice", "priority": "high"}]
