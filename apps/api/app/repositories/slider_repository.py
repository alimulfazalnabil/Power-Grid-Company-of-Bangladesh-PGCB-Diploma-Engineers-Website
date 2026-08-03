from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import and_, func, or_, select
from sqlalchemy.orm import Session

from app.models.slider import Slider
from app.schemas.slider import SliderCreate, SliderUpdate


class SliderRepository:
    """Repository for Slider database operations."""

    def __init__(self, db: Session):
        self.db = db

    def _base_statement(self):
        return select(Slider).where(Slider.deleted.is_(False))

    def create(self, payload: SliderCreate) -> Slider:
        slider = Slider(**payload.model_dump())

        self.db.add(slider)
        self.db.commit()
        self.db.refresh(slider)

        return slider

    def get_by_id(self, slider_id: UUID) -> Slider | None:
        stmt = self._base_statement().where(Slider.id == slider_id)

        return self.db.scalar(stmt)

    def get_active(self) -> list[Slider]:
        now = datetime.now(timezone.utc)

        stmt = (
            self._base_statement()
            .where(
                and_(
                    Slider.is_active.is_(True),
                    or_(
                        Slider.starts_at.is_(None),
                        Slider.starts_at <= now,
                    ),
                    or_(
                        Slider.ends_at.is_(None),
                        Slider.ends_at >= now,
                    ),
                )
            )
            .order_by(
                Slider.sort_order.asc(),
                Slider.created_at.desc(),
            )
        )

        return list(self.db.scalars(stmt).all())

    def list(
        self,
        page: int = 1,
        page_size: int = 10,
    ) -> tuple[list[Slider], int]:
        page = max(page, 1)
        page_size = max(page_size, 1)

        total_stmt = select(func.count()).select_from(Slider).where(Slider.deleted.is_(False))
        total = self.db.scalar(total_stmt) or 0

        stmt = (
            self._base_statement()
            .order_by(
                Slider.sort_order.asc(),
                Slider.created_at.desc(),
            )
            .offset((page - 1) * page_size)
            .limit(page_size)
        )

        items = list(self.db.scalars(stmt).all())

        return items, total

    def update(
        self,
        slider: Slider,
        payload: SliderUpdate,
    ) -> Slider:
        values = payload.model_dump(exclude_unset=True)

        for field, value in values.items():
            setattr(slider, field, value)

        self.db.add(slider)
        self.db.commit()
        self.db.refresh(slider)

        return slider

    def soft_delete(self, slider: Slider) -> Slider:
        slider.deleted = True

        self.db.add(slider)
        self.db.commit()
        self.db.refresh(slider)

        return slider

    def delete(self, slider: Slider) -> Slider:
        return self.soft_delete(slider)


class _SliderRepositoryProxy:
    """Compatibility wrapper for the older service layer call pattern."""

    def list_active(self, db: Session) -> list[Slider]:
        return SliderRepository(db).get_active()

    def create(self, db: Session, payload: SliderCreate) -> Slider:
        return SliderRepository(db).create(payload)

    def get_by_id(self, db: Session, slider_id: UUID) -> Slider | None:
        return SliderRepository(db).get_by_id(slider_id)

    def list(self, db: Session, page: int = 1, page_size: int = 10) -> tuple[list[Slider], int]:
        return SliderRepository(db).list(page=page, page_size=page_size)

    def update(self, db: Session, slider: Slider, payload: SliderUpdate) -> Slider:
        return SliderRepository(db).update(slider, payload)

    def soft_delete(self, db: Session, slider: Slider) -> Slider:
        return SliderRepository(db).soft_delete(slider)

    def delete(self, db: Session, slider: Slider) -> Slider:
        return SliderRepository(db).delete(slider)


slider_repository = _SliderRepositoryProxy()