from fastapi.testclient import TestClient

from app.api.v1.endpoints import sliders as sliders_module
from app.main import app

client = TestClient(app)


def test_sliders_endpoint_returns_sliders(monkeypatch):
    expected = [
        {
            "id": "1",
            "title": "Welcome to PGCB",
            "subtitle": "Professional engineering excellence",
            "image": "/uploads/hero1.jpg",
            "button_text": "Read More",
            "button_url": "/about",
            "sort_order": 1,
            "is_active": True,
            "created_at": "2026-08-03T00:00:00",
            "updated_at": "2026-08-03T00:00:00",
        }
    ]

    monkeypatch.setattr(sliders_module, "get_sliders", lambda db: expected)

    response = client.get("/api/v1/sliders")

    assert response.status_code == 200
    assert response.json()[0]["title"] == "Welcome to PGCB"