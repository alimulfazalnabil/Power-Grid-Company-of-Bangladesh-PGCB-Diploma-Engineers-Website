from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SliderBase(BaseModel):
    """Shared slider fields."""

    title: str = Field(
        ...,
        min_length=3,
        max_length=255,
        examples=["Welcome to PGCB"],
    )

    subtitle: str = Field(
        ...,
        min_length=3,
        max_length=500,
        examples=["Professional Engineering Excellence"],
    )

    description: str = Field(
        default="",
        max_length=2000,
    )

    image_url: str = Field(
        ...,
        examples=["/uploads/sliders/hero-01.jpg"],
    )

    button_text: str = Field(
        default="Learn More",
        max_length=100,
    )

    button_url: str = Field(
        default="/",
        max_length=255,
    )

    sort_order: int = Field(
        default=0,
        ge=0,
    )

    is_active: bool = True

    starts_at: datetime | None = None

    ends_at: datetime | None = None


class SliderCreate(SliderBase):
    """Request body for creating a slider."""


class SliderUpdate(BaseModel):
    """Partial update model."""

    title: str | None = Field(default=None, max_length=255)
    subtitle: str | None = Field(default=None, max_length=500)
    description: str | None = Field(default=None, max_length=2000)
    image_url: str | None = None
    button_text: str | None = Field(default=None, max_length=100)
    button_url: str | None = Field(default=None, max_length=255)
    sort_order: int | None = Field(default=None, ge=0)
    is_active: bool | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None


class SliderResponse(SliderBase):
    """API response model."""

    model_config = ConfigDict(from_attributes=True)

    id: UUID

    created_at: datetime

    updated_at: datetime


class SliderListResponse(BaseModel):
    items: list[SliderResponse]

    total: int

    page: int

    page_size: int


SliderRead = SliderResponse