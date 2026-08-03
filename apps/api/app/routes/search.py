from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/search", tags=["search"])


@router.get("/")
def search() -> dict[str, list[dict[str, str]]]:
    return {"results": [{"title": "Sample result", "type": "member"}]}
