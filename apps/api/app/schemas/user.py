from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class UserRead(BaseModel):
    id: str
    email: EmailStr
    username: str
    first_name: str | None = None
    last_name: str | None = None
    roles: list[str] = []
