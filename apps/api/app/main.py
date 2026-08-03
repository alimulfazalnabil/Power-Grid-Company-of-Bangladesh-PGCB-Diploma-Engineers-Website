from fastapi import FastAPI

from app.routers.auth import router as auth_router
from app.routers.health import router as health_router

app = FastAPI(title="PGCB Portal API", version="0.1.0")

app.include_router(health_router)
app.include_router(auth_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "PGCB Portal API is running"}


@app.get("/docs")
def docs_redirect() -> dict[str, str]:
    return {"message": "Swagger UI available at /docs"}
