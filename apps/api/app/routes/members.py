from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/members", tags=["members"])


@router.get("/")
def list_members() -> list[dict[str, str]]:
    return [{"name": "Sample Member", "circle": "Dhaka"}]
