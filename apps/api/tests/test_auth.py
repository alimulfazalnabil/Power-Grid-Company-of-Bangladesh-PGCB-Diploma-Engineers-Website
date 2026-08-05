from app.auth.jwt import create_access_token, decode_access_token
from app.auth.password import hash_password, verify_password


def test_password_hashing_and_verification() -> None:
    hashed = hash_password("super-secret")

    assert hashed != "super-secret"
    assert verify_password("super-secret", hashed) is True
    assert verify_password("wrong-password", hashed) is False


def test_access_token_contains_standard_claims() -> None:
    token = create_access_token("user-123")
    payload = decode_access_token(token)

    assert payload["sub"] == "user-123"
    assert payload["type"] == "access"
    assert "iat" in payload
    assert "nbf" in payload
    assert "iss" in payload
    assert "aud" in payload
    assert "jti" in payload
