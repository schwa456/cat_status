from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import db_models, database
from . import auth

router = APIRouter(
    prefix="/cats",
    tags=["cats"],
    # dependencies=[Depends(login)] # Add this back when auth is fully implemented
)

@router.post("/", response_model=db_models.Cat)
def create_cat(cat: db_models.CatCreate, db: Session = Depends(database.get_db)):
    db_cat = db_models.Cat(name=cat.name, owner_id=cat.owner_id)
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat

@router.get("/", response_model=List[db_models.Cat])
def get_cats(db: Session = Depends(database.get_db), current_user: db_models.User = Depends(auth.get_current_user)):
    cats = db.query(db_models.Cat).filter(db_models.Cat.owner_id == current_user.id).all()
    return cats

@router.get("/{cat_id}", response_model=db_models.Cat)
def get_cat(cat_id: int, db: Session = Depends(database.get_db)):
    cat = db.query(db_models.Cat).filter(db_models.Cat.id == cat_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Cat not found")
    return cat
