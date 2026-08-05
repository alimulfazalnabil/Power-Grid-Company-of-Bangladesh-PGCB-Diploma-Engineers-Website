from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user, get_db
from app.auth.profile import build_current_user_response
from app.auth.service import login_user, logout_user, refresh_access_token
from app.models.user import User
from app.schemas.auth import (
    AccessTokenResponse,
    LoginRequest,
    RefreshRequest,
    TokenResponse,
)
from app.schemas.user import UserRead

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=200,
    summary="Login",
    description="Authenticate a user and return access and refresh tokens.",
)
def login(request: LoginRequest, http_request: Request, db: Session = Depends(get_db)):
    try:
        return login_user(
            db,
            request.email,
            request.password,
            ip_address=http_request.client.host if http_request and http_request.client else None,
            user_agent=http_request.headers.get("user-agent") if http_request else None,
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid credentials") from exc


@router.post(
    "/refresh",
    response_model=AccessTokenResponse,
    status_code=200,
    summary="Refresh Access Token",
    description="Exchange a valid refresh token for a new access token.",
)
def refresh(request: RefreshRequest, http_request: Request, db: Session = Depends(get_db)):
    try:
        return refresh_access_token(
            db,
            request.refresh_token,
            ip_address=http_request.client.host if http_request and http_request.client else None,
            user_agent=http_request.headers.get("user-agent") if http_request else None,
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid refresh token") from exc


@router.post(
    "/logout",
    status_code=200,
    summary="Logout",
    description="Invalidate the provided refresh token and end the session.",
)
def logout(request: RefreshRequest, http_request: Request, db: Session = Depends(get_db)):
    try:
        logout_user(
            db,
            request.refresh_token,
            ip_address=http_request.client.host if http_request and http_request.client else None,
            user_agent=http_request.headers.get("user-agent") if http_request else None,
        )
        return {"detail": "Logged out"}
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid refresh token") from exc


@router.get(
    "/me",
    status_code=200,
    response_model=UserRead,
    summary="Current User",
    description="Return the currently authenticated user profile.",
    deprecated=True,
)
def auth_current_user(current_user: User = Depends(get_current_user)) -> UserRead:
    return build_current_user_response(current_user)


