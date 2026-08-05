from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base_class import BaseModel


class NoticeStatus(str, Enum):
    DRAFT = 'DRAFT'
    REVIEW = 'REVIEW'
    PUBLISHED = 'PUBLISHED'
    ARCHIVED = 'ARCHIVED'


class Notice(BaseModel):

    __tablename__ = 'notices'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    summary: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    thumbnail: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    status: Mapped[NoticeStatus] = mapped_column(
        SqlEnum(NoticeStatus),
        default=NoticeStatus.DRAFT,
        nullable=False,
    )

    category_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey('notice_categories.id'),
        nullable=False,
    )

    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey('users.id'),
        nullable=False,
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        index=True,
    )

    allow_comments: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    view_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    expires_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    category = relationship(
        'NoticeCategory',
        back_populates='notices',
    )

    author = relationship(
        'User',
    )

    attachments = relationship(
        'NoticeAttachment',
        cascade='all, delete-orphan',
        back_populates='notice',
    )