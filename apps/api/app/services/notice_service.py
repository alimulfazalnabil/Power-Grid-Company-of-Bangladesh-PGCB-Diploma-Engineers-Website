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

    async def create(
        self,
        payload: NoticeCreate,
        author_id: UUID,
    ) -> Notice:

        slug = await self._generate_unique_slug(
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

        return await self.repository.create(notice)

    async def update(
        self,
        notice_id: UUID,
        payload: NoticeUpdate,
    ) -> Notice:

        notice = await self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        update_data = payload.model_dump(
            exclude_unset=True
        )

        if 'slug' in update_data:
            update_data['slug'] = await self._generate_unique_slug(
                update_data['slug'],
                exclude_id=notice.id,
            )

        for key, value in update_data.items():
            setattr(notice, key, value)

        return await self.repository.update(notice)

    async def publish(
        self,
        notice_id: UUID,
    ) -> Notice:

        notice = await self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        notice.status = NoticeStatus.PUBLISHED

        if notice.published_at is None:
            notice.published_at = datetime.now(
                timezone.utc
            )

        return await self.repository.update(notice)

    async def archive(
        self,
        notice_id: UUID,
    ) -> Notice:

        notice = await self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        notice.status = NoticeStatus.ARCHIVED

        return await self.repository.update(notice)

    async def delete(
        self,
        notice_id: UUID,
    ):

        notice = await self.repository.get_by_id(
            notice_id
        )

        if not notice:
            raise ValueError('Notice not found.')

        await self.repository.delete(notice)

    async def get(
        self,
        slug: str,
    ) -> Notice | None:

        notice = await self.repository.get_by_slug(
            slug
        )

        if notice:
            await self.repository.increment_views(
                notice
            )

        return notice

    async def search(
        self,
        params: NoticeSearchParams,
    ):
        return await self.repository.list(
            page=params.page,
            page_size=params.page_size,
            search=params.search,
            category_id=params.category,
            status=params.status,
            featured=params.featured,
        )

    async def latest(
        self,
        limit: int = 5,
    ):
        return await self.repository.get_latest(limit)

    async def _generate_unique_slug(
        self,
        text: str,
        exclude_id: UUID | None = None,
    ) -> str:

        base_slug = slugify(text)

        slug = base_slug

        counter = 2

        while True:

            existing = await self.repository.get_by_slug(
                slug
            )

            if (
                existing is None
                or existing.id == exclude_id
            ):
                return slug

            slug = f'{base_slug}-{counter}'

            counter += 1