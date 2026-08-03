from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/gallery", tags=["gallery"])


@router.get("/")
def list_gallery() -> list[dict[str, str]]:
    return [{"title": "Community Event", "type": "image"}]
