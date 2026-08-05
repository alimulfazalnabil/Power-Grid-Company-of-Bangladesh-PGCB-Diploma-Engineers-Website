from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/ready")
def ready() -> dict[str, str]:
    return {"status": "ready", "service": "api"}


@router.get("/startup")
def startup() -> dict[str, str]:
    return {"status": "started", "service": "api"}


@router.get("/api/v1/health")
def api_v1_health() -> dict[str, str]:
    return {"status": "ok", "service": "api"}
