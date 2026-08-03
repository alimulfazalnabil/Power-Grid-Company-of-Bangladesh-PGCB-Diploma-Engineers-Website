from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import BaseModel


class Role(BaseModel):
    __tablename__ = "roles"

    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String(255), nullable=True)
    user_roles: Mapped[list["UserRole"]] = relationship("UserRole", back_populates="role")
    users: Mapped[list["User"]] = relationship("User", secondary="user_roles", back_populates="roles")
