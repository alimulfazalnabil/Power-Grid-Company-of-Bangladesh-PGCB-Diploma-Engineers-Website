from __future__ import annotations

import logging

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from opentelemetry import trace

from app.exceptions.errors import AppError
from app.exceptions.responses import error_response

logger = logging.getLogger("app.exceptions")


def _trace_id() -> str | None:
    span = trace.get_current_span()
    ctx = span.get_span_context() if span else None
    if not ctx or not ctx.is_valid:
        return None
    return format(ctx.trace_id, "032x")


def _request_id(request: Request) -> str | None:
    return getattr(request.state, "request_id", None)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
        req_id = _request_id(request)
        payload = error_response(
            message=exc.message,
            code=exc.code,
            request_id=req_id,
            trace_id=_trace_id(),
            details=exc.details,
        )
        headers = {"X-Request-ID": req_id} if req_id else None
        return JSONResponse(status_code=exc.status_code, content=payload, headers=headers)

    @app.exception_handler(RequestValidationError)
    async def validation_error_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
        req_id = _request_id(request)
        payload = error_response(
            message="Validation failed",
            code="validation_error",
            request_id=req_id,
            trace_id=_trace_id(),
            details={"errors": exc.errors()},
        )
        headers = {"X-Request-ID": req_id} if req_id else None
        return JSONResponse(status_code=422, content=payload, headers=headers)

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
        req_id = _request_id(request)
        payload = error_response(
            message=str(exc.detail),
            code="http_error",
            request_id=req_id,
            trace_id=_trace_id(),
        )
        headers = {"X-Request-ID": req_id} if req_id else None
        return JSONResponse(status_code=exc.status_code, content=payload, headers=headers)

    @app.exception_handler(ValueError)
    async def value_error_handler(request: Request, exc: ValueError) -> JSONResponse:
        req_id = _request_id(request)
        message = str(exc)
        status_code = 404 if "not found" in message.lower() else 400
        payload = error_response(
            message=message,
            code="domain_error",
            request_id=req_id,
            trace_id=_trace_id(),
        )
        headers = {"X-Request-ID": req_id} if req_id else None
        return JSONResponse(status_code=status_code, content=payload, headers=headers)

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        req_id = _request_id(request)
        logger.exception("Unhandled exception", extra={"request_id": req_id})
        payload = error_response(
            message="Internal server error",
            code="internal_error",
            request_id=req_id,
            trace_id=_trace_id(),
        )
        headers = {"X-Request-ID": req_id} if req_id else None
        return JSONResponse(status_code=500, content=payload, headers=headers)
