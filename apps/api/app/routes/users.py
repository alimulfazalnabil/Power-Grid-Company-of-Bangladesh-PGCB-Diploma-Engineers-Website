from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/users", tags=["users"])


@router.get("/")
def list_users() -> list[dict[str, str]]:
    return [{"email": "member@example.com", "role": "member"}]
