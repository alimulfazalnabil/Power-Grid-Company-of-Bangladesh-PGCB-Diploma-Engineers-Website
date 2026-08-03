from __future__ import annotations

import re
import uuid
from datetime import datetime
from enum import Enum as PyEnum

from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey
from sqlalchemy import Index
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base_class import BaseModel


class NoticeStatus(str, PyEnum):
    DRAFT = 'draft'
    REVIEW = 'review'
    APPROVED = 'approved'
    PUBLISHED = 'published'
    ARCHIVED = 'archived'


class Notice(BaseModel):
    """Editorial notice item used for the public site and CMS workflows."""

    __tablename__ = 'notices'

    __table_args__ = (
        Index('ix_notices_status_published_at', 'status', 'published_at'),
        Index('ix_notices_category_id_status', 'category_id', 'status'),
        Index('ix_notices_is_featured', 'is_featured'),
        Index('ix_notices_slug', 'slug', unique=True),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    title: Mapped[str] = mapped_column(String(255), nullable=False)

    slug: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)

    summary: Mapped[str] = mapped_column(Text, nullable=False)

    content: Mapped[str] = mapped_column(Text, nullable=False)

    thumbnail: Mapped[str | None] = mapped_column(String(500), nullable=True)

    category_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey('notice_categories.id'),
        nullable=False,
        index=True,
    )

    status: Mapped[NoticeStatus] = mapped_column(
        SAEnum(NoticeStatus, name='notice_status', native_enum=False),
        default=NoticeStatus.DRAFT,
        nullable=False,
        index=True,
    )

    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)

    view_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    author_id: Mapped[str | None] = mapped_column(
        String(36),
        ForeignKey('users.id'),
        nullable=True,
        index=True,
    )

    category: Mapped['NoticeCategory'] = relationship('NoticeCategory', back_populates='notices')

    attachments: Mapped[list['NoticeAttachment']] = relationship(
        'NoticeAttachment',
        back_populates='notice',
        cascade='all, delete-orphan',
    )

    author: Mapped['User | None'] = relationship('User')

    @staticmethod
    def generate_slug(title: str) -> str:
        """Generate a URL-friendly slug from a notice title."""

        slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        return slug or 'notice'