from __future__ import annotations

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.slider import Slider

SLIDERS = [
    {
        "title": "Welcome to PGCB",
        "subtitle": "Professional Engineering Excellence",
        "description": (
            "Connecting engineers, promoting innovation, and "
            "supporting professional development."
        ),
        "image_url": "/uploads/sliders/hero-01.jpg",
        "button_text": "Learn More",
        "button_url": "/about",
        "sort_order": 1,
        "is_active": True,
    },
    {
        "title": "Engineering for a Sustainable Future",
        "subtitle": "Innovation • Research • Collaboration",
        "description": (
            "Empowering engineers through knowledge sharing, "
            "technical excellence, and community engagement."
        ),
        "image_url": "/uploads/sliders/hero-02.jpg",
        "button_text": "Our Activities",
        "button_url": "/activities",
        "sort_order": 2,
        "is_active": True,
    },
    {
        "title": "Become a Member",
        "subtitle": "Join Bangladesh's Engineering Community",
        "description": (
            "Membership provides access to professional events, "
            "training, publications, and networking."
        ),
        "image_url": "/uploads/sliders/hero-03.jpg",
        "button_text": "Apply Now",
        "button_url": "/membership",
        "sort_order": 3,
        "is_active": True,
    },
]


def seed_sliders(db: Session) -> None:
    """Insert default sliders if none exist."""

    existing = db.query(Slider).count()

    if existing > 0:
        print("Sliders already exist. Skipping seed.")
        return

    for item in SLIDERS:
        db.add(Slider(**item))

    db.commit()

    print(f"Inserted {len(SLIDERS)} sliders.")


def main() -> None:
    db = SessionLocal()

    try:
        seed_sliders(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()