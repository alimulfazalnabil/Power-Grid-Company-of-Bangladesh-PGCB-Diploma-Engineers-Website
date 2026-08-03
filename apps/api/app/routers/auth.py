from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
def login() -> dict[str, str]:
    return {"message": "Auth placeholder"}
