import os
from dotenv import load_dotenv

load_dotenv()


def _normalize_database_url(url: str) -> str:
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url

DATABASE_URL = _normalize_database_url(
    os.getenv("DATABASE_URL", "postgresql://postgres:StrongPassword@postgres:5432/pgcb")
)
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
JWT_SECRET = os.getenv("JWT_SECRET", "CHANGE_ME")
JWT_REFRESH_SECRET = os.getenv("JWT_REFRESH_SECRET", "CHANGE_ME")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "15"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
NEXT_PUBLIC_API_URL = os.getenv("NEXT_PUBLIC_API_URL", "http://localhost/api")
OTEL_ENABLED = os.getenv("OTEL_ENABLED", "true").lower() == "true"
OTEL_SERVICE_NAME = os.getenv("OTEL_SERVICE_NAME", "pgcb-api")
OTEL_EXPORTER_OTLP_ENDPOINT = os.getenv(
    "OTEL_EXPORTER_OTLP_ENDPOINT", "http://otel-collector:4317"
)
METRICS_ENABLED = os.getenv("METRICS_ENABLED", "true").lower() == "true"

DB_POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "10"))
DB_MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "40"))
DB_POOL_TIMEOUT_SECONDS = int(os.getenv("DB_POOL_TIMEOUT_SECONDS", "30"))
DB_POOL_RECYCLE_SECONDS = int(os.getenv("DB_POOL_RECYCLE_SECONDS", "1800"))

ENABLE_GZIP = os.getenv("ENABLE_GZIP", "true").lower() == "true"
ENABLE_BROTLI = os.getenv("ENABLE_BROTLI", "true").lower() == "true"

REDIS_CACHE_ENABLED = os.getenv("REDIS_CACHE_ENABLED", "true").lower() == "true"
REDIS_CACHE_PREFIX = os.getenv("REDIS_CACHE_PREFIX", "pgcb")

CACHE_TTL_HOMEPAGE_SECONDS = int(os.getenv("CACHE_TTL_HOMEPAGE_SECONDS", "300"))
CACHE_TTL_SETTINGS_SECONDS = int(os.getenv("CACHE_TTL_SETTINGS_SECONDS", "43200"))
CACHE_TTL_CATEGORIES_SECONDS = int(os.getenv("CACHE_TTL_CATEGORIES_SECONDS", "86400"))
CACHE_TTL_USERS_SECONDS = int(os.getenv("CACHE_TTL_USERS_SECONDS", "1800"))
CACHE_TTL_SEARCH_SECONDS = int(os.getenv("CACHE_TTL_SEARCH_SECONDS", "600"))
