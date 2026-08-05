from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session, selectinload

from app.models.notice import Notice, NoticeStatus


class NoticeRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, notice: Notice) -> Notice:
        self.db.add(notice)
        self.db.commit()
        self.db.refresh(notice)
        return notice

    def get_by_id(
        self,
        notice_id: UUID,
    ) -> Notice | None:
        stmt = (
            select(Notice)
            .options(
                selectinload(Notice.category),
                selectinload(Notice.attachments),
            )
            .where(
                Notice.id == notice_id,
                Notice.deleted.is_(False),
            )
        )

        return self.db.scalar(stmt)

    def get_by_slug(
        self,
        slug: str,
    ) -> Notice | None:

        stmt = (
            select(Notice)
            .options(
                selectinload(Notice.category),
                selectinload(Notice.attachments),
            )
            .where(
                Notice.slug == slug,
                Notice.deleted.is_(False),
            )
        )

        return self.db.scalar(stmt)

    def update(
        self,
        notice: Notice,
    ) -> Notice:

        self.db.commit()
        self.db.refresh(notice)

        return notice

    def delete(
        self,
        notice: Notice,
    ) -> None:

        notice.deleted = True
        notice.updated_at = datetime.now(timezone.utc)

        self.db.commit()

    def list(
        self,
        *,
        page: int = 1,
        page_size: int = 10,
        search: str | None = None,
        category_id: UUID | None = None,
        status: NoticeStatus | None = None,
        featured: bool | None = None,
    ):

        query = (
            select(Notice)
            .where(
                Notice.deleted.is_(False)
            )
        )

        if search:
            query = query.where(
                or_(
                    Notice.title.ilike(f"%{search}%"),
                    Notice.summary.ilike(f"%{search}%"),
                    Notice.content.ilike(f"%{search}%"),
                )
            )

        if category_id:
            query = query.where(
                Notice.category_id == category_id
            )

        if status:
            query = query.where(
                Notice.status == status
            )

        if featured is not None:
            query = query.where(
                Notice.is_featured == featured
            )

        total = self.db.scalar(
            select(func.count())
            .select_from(query.subquery())
        )

        query = (
            query
            .order_by(
                Notice.published_at.desc(),
                Notice.created_at.desc(),
            )
            .offset((page - 1) * page_size)
            .limit(page_size)
        )

        items = self.db.scalars(query).all()

        return {
            'items': items,
            'total': total or 0,
            'page': page,
            'page_size': page_size,
        }

    def get_latest(
        self,
        limit: int = 5,
    ):

        stmt = (
            select(Notice)
            .where(
                Notice.status == NoticeStatus.PUBLISHED,
                Notice.deleted.is_(False),
            )
            .order_by(
                Notice.published_at.desc()
            )
            .limit(limit)
        )

        return self.db.scalars(stmt).all()

    def increment_views(
        self,
        notice: Notice,
    ):

        notice.view_count += 1

        self.db.commit()

        return notice