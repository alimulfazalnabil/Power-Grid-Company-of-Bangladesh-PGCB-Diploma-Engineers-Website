from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, Response, status
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

router = APIRouter(
    prefix="/sliders",
    tags=["Sliders"],
)


@router.get(
    "",
    response_model=list[SliderResponse],
)
def get_active_sliders(
    db: Session = Depends(get_db),
):
    """
    Public homepage sliders.
    """

    service = SliderService(db)

    sliders = service.list_active()

    return [SliderResponse.model_validate(item) for item in sliders]


@router.get(
    "/{slider_id}",
    response_model=SliderResponse,
)
def get_slider(
    slider_id: UUID,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    slider = service.get(slider_id)

    return SliderResponse.model_validate(slider)


@router.get(
    "/admin/list",
    response_model=SliderListResponse,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN", "EDITOR")),
    ],
)
def list_sliders(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    return service.list(
        page=page,
        page_size=page_size,
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
def create_slider(
    payload: SliderCreate,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    slider = service.create(payload)

    return SliderResponse.model_validate(slider)


@router.put(
    "/{slider_id}",
    response_model=SliderResponse,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN", "EDITOR")),
    ],
)
def update_slider(
    slider_id: UUID,
    payload: SliderUpdate,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    slider = service.update(
        slider_id,
        payload,
    )

    return SliderResponse.model_validate(slider)


@router.delete(
    "/{slider_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles("SUPER_ADMIN")),
    ],
)
def delete_slider(
    slider_id: UUID,
    db: Session = Depends(get_db),
):
    service = SliderService(db)

    service.delete(slider_id)

    return Response(status_code=status.HTTP_204_NO_CONTENT)