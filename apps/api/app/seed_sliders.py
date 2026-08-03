from app.db.session import SessionLocal
from app.services.slider_service import seed_sliders


def main() -> None:
    with SessionLocal() as session:
        seed_sliders(session)


if __name__ == "__main__":
    main()