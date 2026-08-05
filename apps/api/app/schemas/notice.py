from __future__ import annotations

from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class NoticeStatus(str, Enum):
    DRAFT = 'DRAFT'
    REVIEW = 'REVIEW'
    PUBLISHED = 'PUBLISHED'
    ARCHIVED = 'ARCHIVED'


class NoticeBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    slug: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str

    thumbnail: str | None = None

    category_id: UUID

    is_featured: bool = False

    allow_comments: bool = False

    published_at: datetime | None = None

    expires_at: datetime | None = None


class NoticeCreate(NoticeBase):
    status: NoticeStatus = NoticeStatus.DRAFT


class NoticeUpdate(BaseModel):
    title: str | None = Field(None, min_length=5, max_length=255)
    slug: str | None = Field(None, min_length=5, max_length=255)
    summary: str | None = Field(None, min_length=10, max_length=500)
    content: str | None = None
    thumbnail: str | None = None

    category_id: UUID | None = None

    status: NoticeStatus | None = None

    is_featured: bool | None = None

    allow_comments: bool | None = None

    published_at: datetime | None = None

    expires_at: datetime | None = None


class NoticeResponse(NoticeBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID

    author_id: UUID

    status: NoticeStatus

    view_count: int

    created_at: datetime

    updated_at: datetime


class NoticeListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID

    title: str

    slug: str

    summary: str

    thumbnail: str | None

    status: NoticeStatus

    is_featured: bool

    view_count: int

    published_at: datetime | None


class NoticeListResponse(BaseModel):
    items: list[NoticeListItem]

    total: int

    page: int

    page_size: int


class NoticeSearchParams(BaseModel):
    page: int = Field(default=1, ge=1)

    page_size: int = Field(default=10, ge=1, le=100)

    category: UUID | None = None

    status: NoticeStatus | None = None

    featured: bool | None = None

    search: str | None = None