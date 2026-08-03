from __future__ import annotations

from datetime import datetime
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.slider import Slider
from app.repositories.slider_repository import SliderRepository
from app.schemas.slider import (
    SliderCreate,
    SliderListResponse,
    SliderResponse,
    SliderUpdate,
)


class SliderService:
    """Business logic for homepage sliders."""

    def __init__(self, db: Session):
        self.repository = SliderRepository(db)

    def create(self, payload: SliderCreate) -> Slider:
        self._validate_dates(payload.starts_at, payload.ends_at)

        return self.repository.create(payload)

    def get(self, slider_id: UUID) -> Slider:
        slider = self.repository.get_by_id(slider_id)

        if slider is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Slider not found",
            )

        return slider

    def list_active(self) -> list[Slider]:
        return self.repository.get_active()

    def list(
        self,
        page: int = 1,
        page_size: int = 10,
    ) -> SliderListResponse:
        items, total = self.repository.list(page, page_size)

        return SliderListResponse(
            items=[SliderResponse.model_validate(item) for item in items],
            total=total,
            page=page,
            page_size=page_size,
        )

    def update(
        self,
        slider_id: UUID,
        payload: SliderUpdate,
    ) -> Slider:
        slider = self.get(slider_id)

        starts_at = payload.starts_at if payload.starts_at is not None else slider.starts_at
        ends_at = payload.ends_at if payload.ends_at is not None else slider.ends_at

        self._validate_dates(starts_at, ends_at)

        return self.repository.update(slider, payload)

    def delete(self, slider_id: UUID) -> None:
        slider = self.get(slider_id)

        self.repository.soft_delete(slider)

    @staticmethod
    def _validate_dates(starts_at: datetime | None, ends_at: datetime | None) -> None:
        if starts_at is not None and ends_at is not None and starts_at >= ends_at:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="starts_at must be earlier than ends_at",
            )


def _service(db: Session) -> SliderService:
    return SliderService(db)


def create_slider(db: Session, payload: SliderCreate) -> Slider:
    return _service(db).create(payload)


def get_slider(db: Session, slider_id: UUID) -> Slider:
    return _service(db).get(slider_id)


def list_active_sliders(db: Session) -> list[Slider]:
    return _service(db).list_active()


def list_sliders(db: Session, page: int = 1, page_size: int = 10) -> SliderListResponse:
    return _service(db).list(page=page, page_size=page_size)


def update_slider(db: Session, slider_id: UUID, payload: SliderUpdate) -> Slider:
    return _service(db).update(slider_id, payload)


def delete_slider(db: Session, slider_id: UUID) -> None:
    _service(db).delete(slider_id)


def seed_sliders(db: Session) -> list[Slider]:
    default_sliders = [
        {
            "title": "Welcome to PGCB",
            "subtitle": "Professional engineering excellence for Bangladesh's power grid",
            "description": "Stay informed about professional programs, announcements, and member opportunities.",
            "image_url": "/uploads/hero1.jpg",
            "button_text": "Read More",
            "button_url": "/about",
            "sort_order": 1,
            "is_active": True,
        },
        {
            "title": "Join the Professional Network",
            "subtitle": "Connect with diploma engineers across national operations and development programs",
            "description": "Build your network through membership, training, and community participation.",
            "image_url": "/uploads/hero2.jpg",
            "button_text": "Membership",
            "button_url": "/membership",
            "sort_order": 2,
            "is_active": True,
        },
    ]

    created: list[Slider] = []
    for payload in default_sliders:
        exists = db.query(Slider).filter(Slider.title == payload["title"], Slider.deleted.is_(False)).first()
        if exists:
            continue
        created.append(SliderRepository(db).create(SliderCreate.model_validate(payload)))

    return created