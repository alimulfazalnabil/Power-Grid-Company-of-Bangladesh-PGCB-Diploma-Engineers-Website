from datetime import datetime, timedelta, timezone
from uuid import uuid4

from jose import JWTError, jwt

from app.core.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
    JWT_ISSUER,
    JWT_REFRESH_SECRET,
    JWT_SECRET,
    REFRESH_TOKEN_EXPIRE_DAYS,
)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _build_payload(user_id: str, token_type: str, expires_delta: timedelta) -> dict[str, object]:
    now = _now()
    expires_at = now + expires_delta
    return {
        "sub": user_id,
        "type": token_type,
        "iat": int(now.timestamp()),
        "nbf": int(now.timestamp()),
        "exp": int(expires_at.timestamp()),
        "iss": JWT_ISSUER,
        "aud": JWT_AUDIENCE,
        "jti": str(uuid4()),
    }


def create_access_token(user_id: str) -> str:
    payload = _build_payload(user_id, "access", timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = _build_payload(user_id, "refresh", timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    return jwt.encode(payload, JWT_REFRESH_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict[str, object]:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM], issuer=JWT_ISSUER, audience=JWT_AUDIENCE)


def decode_refresh_token(token: str) -> dict[str, object]:
    return jwt.decode(token, JWT_REFRESH_SECRET, algorithms=[JWT_ALGORITHM], issuer=JWT_ISSUER, audience=JWT_AUDIENCE)
