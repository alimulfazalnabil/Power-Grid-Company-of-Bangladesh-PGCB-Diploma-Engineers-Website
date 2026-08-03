from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/settings", tags=["settings"])


@router.get("/")
def settings() -> dict[str, str]:
    return {"site_name": "PGCB Portal", "theme": "dark"}
