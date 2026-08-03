from sqlalchemy.orm import Session

from app.db.base import Base
from app.db.session import SessionLocal
from app.models.role import Role


def seed_roles() -> None:
    roles = [
        "SUPER_ADMIN",
        "NATIONAL_ADMIN",
        "CIRCLE_ADMIN",
        "EDITOR",
        "MEMBER",
        "GUEST",
    ]
    with SessionLocal() as session:
        for name in roles:
            exists = session.query(Role).filter(Role.name == name).first()
            if not exists:
                session.add(Role(name=name, description=name.replace("_", " ").title()))
        session.commit()


if __name__ == "__main__":
    seed_roles()
