from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    verified: bool

    class Config:
        from_attributes = True

class CatBase(BaseModel):
    name: str

class CatCreate(CatBase):
    owner_id: int

class Cat(CatBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class HealthRecordBase(BaseModel):
    date: str
    weight: float
    meals: int
    poops: int
    plays: int
    sleeps: int

class HealthRecordCreate(HealthRecordBase):
    cat_id: int

class HealthRecord(HealthRecordBase):
    id: int
    cat_id: int

    class Config:
        from_attributes = True

class BloodTestBase(BaseModel):
    date: str
    results: Dict[str, Any]

class BloodTestCreate(BloodTestBase):
    cat_id: int

class BloodTest(BloodTestBase):
    id: int
    cat_id: int

    class Config:
        from_attributes = True