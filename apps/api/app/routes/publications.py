from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/publications", tags=["publications"])


@router.get("/")
def list_publications() -> list[dict[str, str]]:
    return [{"title": "Annual Report", "category": "publication"}]
