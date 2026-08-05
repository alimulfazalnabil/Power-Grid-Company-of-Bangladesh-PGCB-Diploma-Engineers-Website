from __future__ import annotations


def error_response(
    *,
    message: str,
    code: str,
    request_id: str | None,
    trace_id: str | None,
    details: dict[str, object] | None = None,
) -> dict[str, object]:
    return {
        "success": False,
        "error": {
            "code": code,
            "message": message,
            "details": details or {},
            "request_id": request_id,
            "trace_id": trace_id,
        },
    }
