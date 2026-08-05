from __future__ import annotations

from datetime import datetime, timedelta, timezone
from uuid import uuid4

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.notice import Notice, NoticeStatus
from app.models.notice_category import NoticeCategory
from app.models.user import User


CATEGORIES = [
    {
        "name": "General",
        "slug": "general",
        "color": "#2563EB",
        "icon": "megaphone",
    },
    {
        "name": "Membership",
        "slug": "membership",
        "color": "#16A34A",
        "icon": "users",
    },
    {
        "name": "Events",
        "slug": "events",
        "color": "#EA580C",
        "icon": "calendar",
    },
    {
        "name": "Circular",
        "slug": "circular",
        "color": "#7C3AED",
        "icon": "file-text",
    },
    {
        "name": "Tender",
        "slug": "tender",
        "color": "#DC2626",
        "icon": "briefcase",
    },
]


def seed_categories(db: Session):

    for category in CATEGORIES:

        exists = (
            db.query(NoticeCategory)
            .filter(
                NoticeCategory.slug == category["slug"]
            )
            .first()
        )

        if exists:
            continue

        db.add(
            NoticeCategory(
                id=uuid4(),
                **category,
            )
        )

    db.commit()


def seed_notices(db: Session):

    admin = db.query(User).first()

    if not admin:
        print("No users found. Create an admin first.")
        return

    categories = db.query(NoticeCategory).all()

    if not categories:
        return

    if db.query(Notice).count() > 0:
        print("Notice data already exists.")
        return

    now = datetime.now(timezone.utc)

    for index in range(1, 21):

        category = categories[index % len(categories)]

        notice = Notice(
            id=uuid4(),
            title=f"Sample Notice {index}",
            slug=f"sample-notice-{index}",
            summary=f"This is sample notice number {index}.",
            content=f"""
<h2>Sample Notice {index}</h2>

<p>
This is automatically generated sample content
for development and testing.
</p>
            """,
            category_id=category.id,
            author_id=admin.id,
            status=NoticeStatus.PUBLISHED,
            published_at=now - timedelta(days=index),
            is_featured=index <= 5,
            view_count=index * 37,
        )

        db.add(notice)

    db.commit()


def main():

    db = SessionLocal()

    try:

        seed_categories(db)

        seed_notices(db)

        print("Notice seed completed successfully.")

    finally:

        db.close()


if __name__ == "__main__":
    main()