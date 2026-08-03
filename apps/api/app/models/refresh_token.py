from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import BaseModel


class RefreshToken(BaseModel):
    __tablename__ = "refresh_tokens"

    token: Mapped[str] = mapped_column(String(512), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), nullable=False)
