import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:StrongPassword@postgres:5432/pgcb")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
JWT_SECRET = os.getenv("JWT_SECRET", "CHANGE_ME")
JWT_REFRESH_SECRET = os.getenv("JWT_REFRESH_SECRET", "CHANGE_ME")
NEXT_PUBLIC_API_URL = os.getenv("NEXT_PUBLIC_API_URL", "http://localhost/api")
