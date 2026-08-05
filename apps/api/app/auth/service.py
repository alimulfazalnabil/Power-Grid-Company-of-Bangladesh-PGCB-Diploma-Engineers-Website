from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.auth.jwt import create_access_token, create_refresh_token
from app.auth.password import verify_password
from app.core.config import REFRESH_TOKEN_EXPIRE_DAYS
from app.models.audit_log import AuditLog
from app.models.refresh_token import RefreshToken
from app.models.user import User


def _now() -> datetime:
    return datetime.now(timezone.utc)


def log_auth_event(
    db: Session,
    action: str,
    user_id: str | None = None,
    ip_address: str | None = None,
    user_agent: str | None = None,
) -> None:
    db.add(
        AuditLog(
            user_id=user_id,
            action=action,
            ip_address=ip_address,
            user_agent=user_agent,
        )
    )
    db.commit()


def login_user(db: Session, email: str, password: str, ip_address: str | None = None, user_agent: str | None = None) -> dict[str, str]:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        log_auth_event(db, "LOGIN_FAILED", None, ip_address, user_agent)
        raise ValueError("Invalid email or password")

    if not user.is_active:
        raise ValueError("Inactive user")

    access_token = create_access_token(str(user.id))
    refresh_token = create_refresh_token(str(user.id))
    expires_at = _now() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    db.query(RefreshToken).filter(RefreshToken.user_id == str(user.id)).delete(synchronize_session=False)
    db.add(
        RefreshToken(
            token=refresh_token,
            expires_at=expires_at,
            user_id=str(user.id),
        )
    )
    db.commit()
    log_auth_event(db, "LOGIN_SUCCESS", str(user.id), ip_address, user_agent)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer",
    }


def refresh_access_token(db: Session, refresh_token: str, ip_address: str | None = None, user_agent: str | None = None) -> dict[str, str]:
    token_row = db.query(RefreshToken).filter(RefreshToken.token == refresh_token).first()
    if not token_row:
        log_auth_event(db, "TOKEN_REFRESH_FAILED", None, ip_address, user_agent)
        raise ValueError("Invalid refresh token")

    if token_row.expires_at < _now():
        db.delete(token_row)
        db.commit()
        log_auth_event(db, "TOKEN_REFRESH_FAILED", str(token_row.user_id), ip_address, user_agent)
        raise ValueError("Refresh token expired")

    from app.auth.jwt import decode_refresh_token

    try:
        payload = decode_refresh_token(refresh_token)
    except Exception:
        log_auth_event(db, "TOKEN_REFRESH_FAILED", str(token_row.user_id), ip_address, user_agent)
        raise ValueError("Invalid refresh token")

    if payload.get("type") != "refresh":
        raise ValueError("Invalid token type")

    user = db.query(User).filter(User.id == token_row.user_id).first()
    if not user or not user.is_active:
        raise ValueError("Inactive user")

    access_token = create_access_token(str(user.id))
    new_refresh_token = create_refresh_token(str(user.id))
    new_expires_at = _now() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    db.delete(token_row)
    db.add(
        RefreshToken(
            token=new_refresh_token,
            expires_at=new_expires_at,
            user_id=str(user.id),
        )
    )
    db.commit()
    log_auth_event(db, "TOKEN_REFRESH", str(user.id), ip_address, user_agent)
    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "token_type": "Bearer",
    }


def logout_user(db: Session, refresh_token: str, ip_address: str | None = None, user_agent: str | None = None) -> None:
    token_row = db.query(RefreshToken).filter(RefreshToken.token == refresh_token).first()
    if token_row:
        user_id = str(token_row.user_id)
        db.delete(token_row)
        db.commit()
        log_auth_event(db, "LOGOUT", user_id, ip_address, user_agent)
    else:
        log_auth_event(db, "LOGOUT_FAILED", None, ip_address, user_agent)
        raise ValueError("Invalid refresh token")
