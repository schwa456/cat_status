from sqlalchemy.orm import Session
from .database import SessionLocal
from . import db_models
from .routers.auth import get_password_hash

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"
ADMIN_EMAIL = "admin@example.com"

def create_admin():
    db: Session = SessionLocal()
    try:
        db_user = db.query(db_models.User).filter(db_models.User.username == ADMIN_USERNAME).first()
        if db_user:
            print("Admin user already exists.")
            return

        hashed_password = get_password_hash(ADMIN_PASSWORD)
        admin_user = db_models.User(
            username=ADMIN_USERNAME,
            email=ADMIN_EMAIL,
            hashed_password=hashed_password,
            verified=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print("Admin user created successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()