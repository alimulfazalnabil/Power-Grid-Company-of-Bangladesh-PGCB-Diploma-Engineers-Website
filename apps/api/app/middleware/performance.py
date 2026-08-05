from __future__ import annotations

import os
from uuid import uuid4

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from app.core.config import (
    API_CORS_ORIGINS,
    API_TRUSTED_HOSTS,
    ENABLE_BROTLI,
    ENABLE_GZIP,
    ENABLE_HTTPS_REDIRECT,
    ENABLE_SECURITY_HEADERS,
)
from app.utils.request_context import reset_request_id, set_request_id


class RequestIDMiddleware(BaseHTTPMiddleware):
    """Attach a correlation ID to each request and response."""

    async def dispatch(self, request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid4()))
        request.state.request_id = request_id
        token = set_request_id(request_id)
        try:
            response: Response = await call_next(request)
            response.headers.setdefault("X-Request-ID", request_id)
            return response
        finally:
            reset_request_id(token)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Apply baseline security headers to all responses."""

    async def dispatch(self, request, call_next):
        response: Response = await call_next(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
        response.headers.setdefault(
            "Content-Security-Policy",
            "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none';",
        )
        response.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        return response


class CacheHeadersMiddleware(BaseHTTPMiddleware):
    """Apply conservative default cache headers for API responses."""

    async def dispatch(self, request, call_next):
        response: Response = await call_next(request)

        if request.url.path.startswith("/api"):
            response.headers.setdefault("Cache-Control", "no-store, max-age=0")
            response.headers.setdefault("Pragma", "no-cache")

        return response


def configure_performance_middleware(app: FastAPI) -> None:
    app.add_middleware(RequestIDMiddleware)

    is_render_runtime = bool(os.getenv("RENDER")) or bool(os.getenv("RENDER_EXTERNAL_URL"))

    # Render health checks can use internal host headers that won't match strict allowlists.
    # Skip TrustedHostMiddleware on Render to avoid false 400s during startup probes.
    if API_TRUSTED_HOSTS and not is_render_runtime:
        app.add_middleware(TrustedHostMiddleware, allowed_hosts=API_TRUSTED_HOSTS)

    if ENABLE_HTTPS_REDIRECT:
        app.add_middleware(HTTPSRedirectMiddleware)

    if ENABLE_SECURITY_HEADERS:
        app.add_middleware(SecurityHeadersMiddleware)

    if API_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=API_CORS_ORIGINS,
            allow_credentials=True,
            allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allow_headers=["*"],
            expose_headers=["X-Request-ID"],
        )

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
