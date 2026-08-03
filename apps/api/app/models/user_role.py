from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import BaseModel


class UserRole(BaseModel):
    __tablename__ = "user_roles"

    user_id: Mapped[str] = mapped_column(String(36), nullable=False)
    role_id: Mapped[str] = mapped_column(String(36), nullable=False)
