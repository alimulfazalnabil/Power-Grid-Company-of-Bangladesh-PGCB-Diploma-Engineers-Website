from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from app.core.config import ENABLE_BROTLI, ENABLE_GZIP


class CacheHeadersMiddleware(BaseHTTPMiddleware):
    """Apply conservative default cache headers for API responses."""

    async def dispatch(self, request, call_next):
        response: Response = await call_next(request)

        if request.url.path.startswith("/api"):
            response.headers.setdefault("Cache-Control", "no-store, max-age=0")
            response.headers.setdefault("Pragma", "no-cache")

        return response


def configure_performance_middleware(app: FastAPI) -> None:
    app.add_middleware(CacheHeadersMiddleware)

    if ENABLE_GZIP:
        app.add_middleware(GZipMiddleware, minimum_size=500)

    if ENABLE_BROTLI:
        try:
            from brotli_asgi import BrotliMiddleware

            app.add_middleware(BrotliMiddleware, quality=4, minimum_size=500)
        except ImportError:
            # Fallback to gzip only when Brotli dependency is unavailable.
            pass
