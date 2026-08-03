from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/v1/users", tags=["users"])


@router.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)) -> dict[str, object]:
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "roles": [role.name for role in current_user.roles] if hasattr(current_user, "roles") else [],
    }
