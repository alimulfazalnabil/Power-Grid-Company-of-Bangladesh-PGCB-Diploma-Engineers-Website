from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/events", tags=["events"])


@router.get("/")
def list_events() -> list[dict[str, str]]:
    return [{"title": "Annual Conference", "location": "Dhaka"}]
