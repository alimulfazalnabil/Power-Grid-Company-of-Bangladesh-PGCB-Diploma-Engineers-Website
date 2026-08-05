from __future__ import annotations

import json
from typing import Any

from redis.asyncio import Redis

from app.core.config import REDIS_CACHE_ENABLED, REDIS_CACHE_PREFIX, REDIS_URL

_redis_client: Redis | None = None


async def get_redis_client() -> Redis | None:
    global _redis_client

    if not REDIS_CACHE_ENABLED:
        return None

    if _redis_client is None:
        _redis_client = Redis.from_url(REDIS_URL, decode_responses=True)

    return _redis_client


def build_cache_key(*parts: Any) -> str:
    normalized = ":".join(str(part) for part in parts)
    return f"{REDIS_CACHE_PREFIX}:{normalized}"


async def get_cached_json(key: str) -> Any | None:
    client = await get_redis_client()
    if client is None:
        return None

    try:
        raw = await client.get(key)
        if raw is None:
            return None
        return json.loads(raw)
    except Exception:
        return None


async def set_cached_json(key: str, value: Any, ttl_seconds: int) -> None:
    client = await get_redis_client()
    if client is None:
        return

    try:
        await client.set(key, json.dumps(value), ex=ttl_seconds)
    except Exception:
        return


async def close_redis_client() -> None:
    global _redis_client

    if _redis_client is None:
        return

    await _redis_client.aclose()
    _redis_client = None
