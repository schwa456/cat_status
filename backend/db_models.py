from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    verified = Column(Boolean, default=False)
    nickname = Column(String, index=True)
    phone = Column(String, index=True)

    cats = relationship("Cat", back_populates="owner")

class Cat(Base):
    __tablename__ = "cats"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="cats")
    health_records = relationship("HealthRecord", back_populates="cat")
    blood_tests = relationship("BloodTest", back_populates="cat")

class HealthRecord(Base):
    __tablename__ = "health_records"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    weight = Column(Float)
    meals = Column(Integer)
    poops = Column(Integer)
    plays = Column(Integer)
    sleeps = Column(Integer)
    cat_id = Column(Integer, ForeignKey("cats.id"))

    cat = relationship("Cat", back_populates="health_records")

class BloodTest(Base):
    __tablename__ = "blood_tests"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    results = Column(JSON)
    cat_id = Column(Integer, ForeignKey("cats.id"))

    cat = relationship("Cat", back_populates="blood_tests")
