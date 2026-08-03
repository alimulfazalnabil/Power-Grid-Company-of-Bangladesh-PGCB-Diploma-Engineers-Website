from sqlalchemy.orm import Session

from app.auth.password import hash_password
from app.db.base import Base
from app.db.session import SessionLocal
from app.models.role import Role
from app.models.user import User
from app.models.user_role import UserRole


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


def seed_super_admin() -> None:
    admin_email = "admin@pgcb.org"
    admin_username = "admin"
    admin_password = "ChangeMe123!"
    with SessionLocal() as session:
        role = session.query(Role).filter(Role.name == "SUPER_ADMIN").first()
        if not role:
            raise RuntimeError("SUPER_ADMIN role must exist before seeding admin")

        user = session.query(User).filter(User.email == admin_email).first()
        if not user:
            user = User(
                email=admin_email,
                username=admin_username,
                password_hash=hash_password(admin_password),
                first_name="PGCB",
                last_name="Admin",
                is_active=True,
                is_verified=True,
                is_superuser=True,
            )
            session.add(user)
            session.flush()

        existing_assignment = session.query(UserRole).filter(
            UserRole.user_id == user.id,
            UserRole.role_id == role.id,
        ).first()
        if not existing_assignment:
            session.add(UserRole(user_id=user.id, role_id=role.id))

        session.commit()


if __name__ == "__main__":
    seed_roles()
    seed_super_admin()
