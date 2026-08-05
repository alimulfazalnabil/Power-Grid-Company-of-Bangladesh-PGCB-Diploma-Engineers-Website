from __future__ import annotations

from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    Response,
    status,
)
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import get_current_user
from app.db.dependencies import get_db
from app.models.user import User
from app.repositories.notice_repository import NoticeRepository
from app.schemas.notice import (
    NoticeCreate,
    NoticeListResponse,
    NoticeResponse,
    NoticeSearchParams,
    NoticeUpdate,
)
from app.services.notice_service import NoticeService
from app.core.config import (
    CACHE_TTL_HOMEPAGE_SECONDS,
    CACHE_TTL_SEARCH_SECONDS,
)
from app.utils.cache import build_cache_key, get_cached_json, set_cached_json

router = APIRouter(
    prefix='/notices',
    tags=['Notices'],
)


def get_service(
    db: AsyncSession = Depends(get_db),
) -> NoticeService:
    repository = NoticeRepository(db)
    return NoticeService(repository)


@router.get(
    '',
    response_model=NoticeListResponse,
)
async def list_notices(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str | None = None,
    category: UUID | None = None,
    status: str | None = None,
    featured: bool | None = None,
    response: Response,
    service: NoticeService = Depends(get_service),
):
    response.headers["Cache-Control"] = "public, max-age=0, s-maxage=600, stale-while-revalidate=60"

    cache_key = build_cache_key(
        "notices",
        "search",
        page,
        page_size,
        search or "",
        category or "",
        status or "",
        featured if featured is not None else "",
    )

    cached = await get_cached_json(cache_key)
    if cached is not None:
        return cached

    params = NoticeSearchParams(
        page=page,
        page_size=page_size,
        search=search,
        category=category,
        status=status,
        featured=featured,
    )

    result = await service.search(params)

    response_payload = NoticeListResponse.model_validate(result).model_dump(mode="json")
    await set_cached_json(cache_key, response_payload, CACHE_TTL_SEARCH_SECONDS)

    return response_payload


@router.get(
    '/latest',
    response_model=list[NoticeResponse],
)
async def latest_notices(
    limit: int = Query(5, ge=1, le=20),
    response: Response,
    service: NoticeService = Depends(get_service),
):
    response.headers["Cache-Control"] = "public, max-age=0, s-maxage=300, stale-while-revalidate=60"

    cache_key = build_cache_key("notices", "latest", limit)
    cached = await get_cached_json(cache_key)
    if cached is not None:
        return cached

    notices = await service.latest(limit)
    payload = [NoticeResponse.model_validate(item).model_dump(mode="json") for item in notices]
    await set_cached_json(cache_key, payload, CACHE_TTL_HOMEPAGE_SECONDS)

    return payload


@router.get(
    '/{slug}',
    response_model=NoticeResponse,
)
async def get_notice(
    slug: str,
    service: NoticeService = Depends(get_service),
):

    notice = await service.get(slug)

    if not notice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Notice not found.',
        )

    return notice


@router.post(
    '',
    response_model=NoticeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_notice(
    payload: NoticeCreate,
    current_user: User = Depends(get_current_user),
    service: NoticeService = Depends(get_service),
):

    return await service.create(
        payload,
        current_user.id,
    )


@router.put(
    '/{notice_id}',
    response_model=NoticeResponse,
)
async def update_notice(
    notice_id: UUID,
    payload: NoticeUpdate,
    current_user: User = Depends(get_current_user),
    service: NoticeService = Depends(get_service),
):

    return await service.update(
        notice_id,
        payload,
    )


@router.delete(
    '/{notice_id}',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_notice(
    notice_id: UUID,
    current_user: User = Depends(get_current_user),
    service: NoticeService = Depends(get_service),
):

    await service.delete(notice_id)

    return None


@router.post(
    '/{notice_id}/publish',
    response_model=NoticeResponse,
)
async def publish_notice(
    notice_id: UUID,
    current_user: User = Depends(get_current_user),
    service: NoticeService = Depends(get_service),
):

    return await service.publish(notice_id)


@router.post(
    '/{notice_id}/archive',
    response_model=NoticeResponse,
)
async def archive_notice(
    notice_id: UUID,
    current_user: User = Depends(get_current_user),
    service: NoticeService = Depends(get_service),
):

    return await service.archive(notice_id)