from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.v1.router import api_router
from app.middleware.performance import configure_performance_middleware
from app.observability import configure_observability
from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.users import router as users_router
from app.utils.cache import close_redis_client


@asynccontextmanager
async def lifespan(_app: FastAPI):
    yield
    await close_redis_client()


app = FastAPI(title="PGCB Portal API", version="0.1.0", lifespan=lifespan)

configure_observability(app)
configure_performance_middleware(app)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(api_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"status": "ok", "service": "api", "version": app.version}


@app.get("/live")
def live() -> dict[str, str]:
    return {"status": "alive", "service": "api"}
