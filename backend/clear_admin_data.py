from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend import db_models

ADMIN_USERNAME = "admin"

def clear_admin_data():
    db: Session = SessionLocal()
    try:
        admin_user = db.query(db_models.User).filter(db_models.User.username == ADMIN_USERNAME).first()

        if not admin_user:
            print(f"Admin user '{ADMIN_USERNAME}' not found.")
            return

        # Get all cats owned by the admin
        admin_cats = db.query(db_models.Cat).filter(db_models.Cat.owner_id == admin_user.id).all()

        if not admin_cats:
            print(f"No cats found for admin user '{ADMIN_USERNAME}'.")
            return

        for cat in admin_cats:
            # Delete health records for the current cat
            db.query(db_models.HealthRecord).filter(db_models.HealthRecord.cat_id == cat.id).delete()
            # Delete blood tests for the current cat
            db.query(db_models.BloodTest).filter(db_models.BloodTest.cat_id == cat.id).delete()
            # Delete the cat itself
            db.delete(cat)

        db.commit()
        print(f"All data (cats, health records, blood tests) for admin user '{ADMIN_USERNAME}' cleared successfully.")

    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    clear_admin_data()
