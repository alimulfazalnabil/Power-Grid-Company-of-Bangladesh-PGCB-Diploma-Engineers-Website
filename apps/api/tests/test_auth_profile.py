from types import SimpleNamespace

from app.auth.profile import build_current_user_response


def test_build_current_user_response_maps_all_expected_fields() -> None:
    current_user = SimpleNamespace(
        id="user-1",
        email="user@example.com",
        username="pgcb-user",
        first_name="PGCB",
        last_name="Member",
        roles=[SimpleNamespace(name="EDITOR"), SimpleNamespace(name="SUPER_ADMIN")],
    )

    response = build_current_user_response(current_user)

    assert response.id == "user-1"
    assert response.email == "user@example.com"
    assert response.username == "pgcb-user"
    assert response.first_name == "PGCB"
    assert response.last_name == "Member"
    assert response.roles == ["EDITOR", "SUPER_ADMIN"]


def test_build_current_user_response_handles_missing_roles_attribute() -> None:
    current_user = SimpleNamespace(
        id="user-2",
        email="no-roles@example.com",
        username="no-roles",
        first_name=None,
        last_name=None,
    )

    response = build_current_user_response(current_user)

    assert response.roles == []
