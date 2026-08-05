from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, Response, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user, require_roles
from app.db.dependencies import get_db
from app.schemas.slider import (
    SliderCreate,
    SliderListResponse,
    SliderResponse,
    SliderUpdate,
)
from app.services.slider_service import SliderService
from app.core.config import CACHE_TTL_HOMEPAGE_SECONDS
from app.utils.cache import build_cache_key, get_cached_json, set_cached_json

router = APIRouter(
    prefix="/sliders",
    tags=["Sliders"],
)


@router.get(
    "",
    response_model=list[SliderResponse],
)
async def get_active_sliders(
    response: Response,
    db: Session = Depends(get_db),
):
    """
    Public homepage sliders.
    """

    response.headers["Cache-Control"] = "public, max-age=0, s-maxage=300, stale-while-revalidate=60"

    cache_key = build_cache_key("sliders", "active")
    cached = await get_cached_json(cache_key)
    if cached is not None:
        return cached

    service = SliderService(db)
    sliders = await run_in_threadpool(service.list_active)
    payload = [SliderResponse.model_validate(item).model_dump(mode="json") for item in sliders]

    await set_cached_json(cache_key, payload, CACHE_TTL_HOMEPAGE_SECONDS)

    return payload


@router.get(
    "/{slider_id}",
    response_model=SliderResponse,
)
async def get_slider(
    slider_id: UUID,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    cache_key = build_cache_key("sliders", "by-id", slider_id)
    cached = await get_cached_json(cache_key)
    if cached is not None:
        return cached

    slider = await run_in_threadpool(service.get, slider_id)
    payload = SliderResponse.model_validate(slider).model_dump(mode="json")
    await set_cached_json(cache_key, payload, CACHE_TTL_HOMEPAGE_SECONDS)

    return payload


@router.get(
    "/admin/list",
    response_model=SliderListResponse,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN", "EDITOR")),
    ],
)
async def list_sliders(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    return await run_in_threadpool(
        service.list,
        page,
        page_size,
    )


@router.post(
    "",
    response_model=SliderResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN", "EDITOR")),
    ],
)
async def create_slider(
    payload: SliderCreate,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    slider = await run_in_threadpool(service.create, payload)

    return SliderResponse.model_validate(slider)


@router.put(
    "/{slider_id}",
    response_model=SliderResponse,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN", "EDITOR")),
    ],
)
async def update_slider(
    slider_id: UUID,
    payload: SliderUpdate,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    slider = await run_in_threadpool(service.update, slider_id, payload)

    return SliderResponse.model_validate(slider)


@router.delete(
    "/{slider_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN")),
    ],
)
async def delete_slider(
    slider_id: UUID,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    await run_in_threadpool(service.delete, slider_id)

    return Response(status_code=status.HTTP_204_NO_CONTENT)