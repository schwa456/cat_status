from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(unique=True, index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    hashed_password: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=True)
    verified: Mapped[bool] = mapped_column(default=False)
    nickname: Mapped[str] = mapped_column(index=True)
    phone: Mapped[str] = mapped_column

    cats = relationship("Cat", back_populates="owns")

class Cat(Base):
    __tablename__ = "cat"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    name: Mapped[str] = mapped_column(index=True)
    species: Mapped[str] = mapped_column(index=True)
    birth_date: Mapped[DateTime] = mapped_column(index=True)
    age: Mapped[int] = mapped_column(index=True)
    gender: Mapped[str] = mapped_column(index=True)
    neutered: Mapped[bool] = mapped_column(index=False)

    owner: Mapped["User"] = relationship(back_populates="cat")
    health_record: Mapped["HealthRecord"] = relationship(back_populates="cat")
    blood_test: Mapped["BloodTestEvent"] = relationship(back_populates="cat")

class HealthRecord(Base):
    __tablename__ = "health_record"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    date: Mapped[DateTime] = mapped_column(index=True)
    weight: Mapped[float] = mapped_column(index=True)
    meals: Mapped[int] = mapped_column(index=True)
    water: Mapped[int] = mapped_column(index=True)
    urine: Mapped[int] = mapped_column(index=True)
    poops: Mapped[int] = mapped_column(index=True)
    plays: Mapped[int] = mapped_column(index=True)
    sleeps: Mapped[int] = mapped_column(index=True)
    notes: Mapped[str] = mapped_column(index=True)
    cat_id: Mapped[int] = mapped_column(ForeignKey("cat.id"))

    cat: Mapped["Cat"] = relationship(back_populates="health_record")

class BloodTestEvent(Base):
    __tablename__ = "blood_test_event"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    date: Mapped[DateTime] = mapped_column(index=True)
    hospital: Mapped[str] = mapped_column(index=True)
    notes: Mapped[str] = mapped_column(index=True)

    cat_id: Mapped[int] = mapped_column(ForeignKey("cat.id"))

    cat: Mapped["Cat"] = relationship(back_populates="blood_test_event")

class CBCPanel(Base):
    __tablename__ = "cbc_panel"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    wbc: Mapped[float] = mapped_column(index=True)
    rbc: Mapped[float] = mapped_column(index=True)
    hgb: Mapped[float] = mapped_column(index=True)
    hct: Mapped[float] = mapped_column(index=True)
    plt: Mapped[float] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="cbc_panel")

class ChemistryPanel(Base):
    __tablename__ = "chemistry_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    alp: Mapped[float] = mapped_column(index=True)
    alt: Mapped[float] = mapped_column(index=True)
    bun: Mapped[float] = mapped_column(index=True)
    crea: Mapped[float] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="chemistry_panel")

class LiverPanel(Base):
    __tablename__ = "liver_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    ast: Mapped[float] = mapped_column(index=True)
    ggt: Mapped[float] = mapped_column(index=True)
    tbli: Mapped[float] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="liver_panel")

class DiabetesPanel(Base):
    __tablename__ = "diabetes_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    glu: Mapped[float] = mapped_column(index=True)
    fru: Mapped[float] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="diabetes_panel")