from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID

from slugify import slugify

from app.models.notice import Notice, NoticeStatus
from app.repositories.notice_repository import NoticeRepository
from app.schemas.notice import (
    NoticeCreate,
    NoticeSearchParams,
    NoticeUpdate,
)


class NoticeService:
    def __init__(
        self,
        repository: NoticeRepository,
    ):
        self.repository = repository

    def create(
        self,
        payload: NoticeCreate,
        author_id: UUID,
    ) -> Notice:

        slug = self._generate_unique_slug(
            payload.slug or payload.title
        )

        notice = Notice(
            title=payload.title,
            slug=slug,
            summary=payload.summary,
            content=payload.content,
            thumbnail=payload.thumbnail,
            category_id=payload.category_id,
            author_id=author_id,
            status=payload.status,
            is_featured=payload.is_featured,
            allow_comments=payload.allow_comments,
            published_at=payload.published_at,
            expires_at=payload.expires_at,
        )

        return self.repository.create(notice)

    def update(
        self,
        notice_id: UUID,
        payload: NoticeUpdate,
    ) -> Notice:

        notice = self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        update_data = payload.model_dump(
            exclude_unset=True
        )

        if 'slug' in update_data:
            update_data['slug'] = self._generate_unique_slug(
                update_data['slug'],
                exclude_id=notice.id,
            )

        for key, value in update_data.items():
            setattr(notice, key, value)

        return self.repository.update(notice)

    def publish(
        self,
        notice_id: UUID,
    ) -> Notice:

        notice = self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        notice.status = NoticeStatus.PUBLISHED

        if notice.published_at is None:
            notice.published_at = datetime.now(
                timezone.utc
            )

        return self.repository.update(notice)

    def archive(
        self,
        notice_id: UUID,
    ) -> Notice:

        notice = self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        notice.status = NoticeStatus.ARCHIVED

        return self.repository.update(notice)

    def delete(
        self,
        notice_id: UUID,
    ):

        notice = self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        self.repository.delete(notice)

    def get(
        self,
        slug: str,
    ) -> Notice | None:

        notice = self.repository.get_by_slug(
            slug
        )

        if notice:
            self.repository.increment_views(
                notice
            )

        return notice

    def search(
        self,
        params: NoticeSearchParams,
    ):
        return self.repository.list(
            page=params.page,
            page_size=params.page_size,
            search=params.search,
            category_id=params.category,
            status=params.status,
            featured=params.featured,
        )

    def latest(
        self,
        limit: int = 5,
    ):
        return self.repository.get_latest(limit)

    def _generate_unique_slug(
        self,
        text: str,
        exclude_id: UUID | None = None,
    ) -> str:

        base_slug = slugify(text)

        slug = base_slug

        counter = 2

        while True:

            existing = self.repository.get_by_slug(
                slug
            )

            if (
                existing is None
                or existing.id == exclude_id
            ):
                return slug

            slug = f'{base_slug}-{counter}'

            counter += 1