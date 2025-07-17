from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, db_models, database

router = APIRouter(
    prefix="/health",
    tags=["health"],
    # dependencies=[Depends(login)] # Add this back when auth is fully implemented
)

@router.post("/records", response_model=models.HealthRecord)
def create_health_record(record: models.HealthRecordCreate, db: Session = Depends(database.get_db)):
    # Check if a record for this cat and date already exists
    existing_record = db.query(db_models.HealthRecord).filter(
        db_models.HealthRecord.cat_id == record.cat_id,
        db_models.HealthRecord.date == record.date
    ).first()

    if existing_record:
        # Update existing record
        existing_record.weight = record.weight
        existing_record.meals = record.meals
        existing_record.poops = record.poops
        existing_record.plays = record.plays
        existing_record.sleeps = record.sleeps
        db.commit()
        db.refresh(existing_record)
        return existing_record
    else:
        # Create new record
        db_record = db_models.HealthRecord(**record.dict())
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        return db_record

@router.get("/records/{cat_id}", response_model=List[models.HealthRecord])
def get_health_records(cat_id: int, db: Session = Depends(database.get_db)):
    records = db.query(db_models.HealthRecord).filter(db_models.HealthRecord.cat_id == cat_id).all()
    return records

@router.post("/blood-tests", response_model=models.BloodTest)
def create_blood_test(test: models.BloodTestCreate, db: Session = Depends(database.get_db)):
    db_test = db_models.BloodTest(**test.dict())
    db.add(db_test)
    db.commit()
    db.refresh(db_test)
    return db_test

@router.get("/blood-tests/{cat_id}", response_model=List[models.BloodTest])
def get_blood_tests(cat_id: int, db: Session = Depends(database.get_db)):
    tests = db.query(db_models.BloodTest).filter(db_models.BloodTest.cat_id == cat_id).all()
    return tests
