from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend import db_models
from backend.routers.auth import verify_password

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"

def check_admin_user():
    db: Session = SessionLocal()
    try:
        admin_user = db.query(db_models.User).filter(db_models.User.username == ADMIN_USERNAME).first()

        if not admin_user:
            print(f"Admin user '{ADMIN_USERNAME}' does NOT exist in the database.")
            print("Please ensure you have run: python -m backend.init_db and then python -m backend.create_admin")
            return

        print(f"Admin user '{ADMIN_USERNAME}' found:")
        print(f"  ID: {admin_user.id}")
        print(f"  Email: {admin_user.email}")
        print(f"  Hashed Password: {admin_user.hashed_password}")
        print(f"  Is Active: {admin_user.is_active}")
        print(f"  Verified: {admin_user.verified}")

        if verify_password(ADMIN_PASSWORD, admin_user.hashed_password):
            print(f"  Password 'admin' matches the stored hash.")
        else:
            print(f"  WARNING: Password 'admin' does NOT match the stored hash.")

        if not admin_user.verified:
            print(f"  WARNING: Admin user is NOT verified. This might prevent login.")

        if not admin_user.is_active:
            print(f"  WARNING: Admin user is NOT active. This might prevent login.")

    except Exception as e:
        print(f"An error occurred while checking admin user: {e}")
        print("Ensure your backend server is NOT running when executing this script, and that cat_health.db exists.")
    finally:
        db.close()

if __name__ == "__main__":
    check_admin_user()
