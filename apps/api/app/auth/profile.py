from app.models.user import User
from app.schemas.user import UserRead


def build_current_user_response(current_user: User) -> UserRead:
    return UserRead(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        roles=[role.name for role in current_user.roles] if hasattr(current_user, "roles") else [],
    )
