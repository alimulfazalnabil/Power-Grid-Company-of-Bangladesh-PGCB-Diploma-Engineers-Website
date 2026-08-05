from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import (
	DATABASE_URL,
	DB_MAX_OVERFLOW,
	DB_POOL_RECYCLE_SECONDS,
	DB_POOL_SIZE,
	DB_POOL_TIMEOUT_SECONDS,
)

engine = create_engine(
	DATABASE_URL,
	future=True,
	pool_pre_ping=True,
	pool_size=DB_POOL_SIZE,
	max_overflow=DB_MAX_OVERFLOW,
	pool_timeout=DB_POOL_TIMEOUT_SECONDS,
	pool_recycle=DB_POOL_RECYCLE_SECONDS,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
