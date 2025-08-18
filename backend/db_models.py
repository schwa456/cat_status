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
    breed: Mapped[str] = mapped_column(index=True)
    birth_date: Mapped[DateTime] = mapped_column(index=True)
    meet_date: Mapped[DateTime] = mapped_column(index=True)
    age: Mapped[int] = mapped_column(index=True)
    gender: Mapped[str] = mapped_column(index=True)
    neutered: Mapped[bool] = mapped_column(index=False)

    owner: Mapped["User"] = relationship(back_populates="cat")
    health_record: Mapped["ActivityRecord"] = relationship(back_populates="cat")
    blood_test_event: Mapped["BloodTestEvent"] = relationship(back_populates="cat")

class ActivityRecord(Base):
    __tablename__ = "activity_record"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cat_id: Mapped[int] = mapped_column(ForeignKey("cat.id"))
    record_date: Mapped[DateTime] = mapped_column(index=True)
    weight_kg: Mapped[float] = mapped_column(index=True)
    food_amount_g: Mapped[int] = mapped_column(index=True)
    urine: Mapped[int] = mapped_column(index=True)
    stool: Mapped[int] = mapped_column(index=True)
    sleep_min: Mapped[int] = mapped_column(index=True)
    play_min: Mapped[int] = mapped_column(index=True)
    vomit: Mapped[int] = mapped_column(index=True)
    special_notes: Mapped[str] = mapped_column(index=True)

    cat: Mapped["Cat"] = relationship(back_populates="health_record")

class BloodTestEvent(Base):
    __tablename__ = "blood_test_event"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cat_id: Mapped[int] = mapped_column(ForeignKey("cat.id"))

    date: Mapped[DateTime] = mapped_column(index=True)
    hospital_name: Mapped[str] = mapped_column(index=True)
    notes: Mapped[str] = mapped_column(index=True)

    cat: Mapped["Cat"] = relationship(back_populates="blood_test_event")

class CBCPanel(Base):
    __tablename__ = "cbc_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    test_date: Mapped[DateTime] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="cbc_panel")

class RBCPanel(Base):
    __tablename__ = "rbc_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cbc_id: Mapped[int] = mapped_column(ForeignKey("cbc_panel.id"), index=True)
    rbc: Mapped[float] = mapped_column(index=True)
    hct: Mapped[float] = mapped_column(index=True)
    hgb: Mapped[float] = mapped_column(index=True)
    mch: Mapped[float] = mapped_column(index=True)
    mchc: Mapped[float] = mapped_column(index=True)
    mcv: Mapped[float] = mapped_column(index=True)
    rdw_cv: Mapped[float] = mapped_column(index=True)
    rdw_sd: Mapped[float] = mapped_column(index=True)
    retics: Mapped[float] = mapped_column(index=True)

    cbc: Mapped["CBCPanel"] = relationship(back_populates="rbc_panel")

class WBCPanel(Base):
    __tablename__ = "wbc_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cbc_id: Mapped[int] = mapped_column(ForeignKey("cbc_panel.id"), index=True)
    wbc: Mapped[float] = mapped_column(index=True)
    neu: Mapped[float] = mapped_column(index=True)
    mono: Mapped[float] = mapped_column(index=True)
    gran: Mapped[float] = mapped_column(index=True)
    lym: Mapped[float] = mapped_column(index=True)
    mid: Mapped[float] = mapped_column(index=True)
    eos: Mapped[float] = mapped_column(index=True)
    baso: Mapped[float] = mapped_column(index=True)
    segs: Mapped[float] = mapped_column(index=True)

    cbc: Mapped["CBCPanel"] = relationship(back_populates="wbc_panel")

class PLTPanel(Base):
    __tablename__ = "plt_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cbc_id: Mapped[int] = mapped_column(ForeignKey("cbc_panel.id"), index=True)
    plt: Mapped[float] = mapped_column(index=True)
    pdw_cv: Mapped[float] = mapped_column(index=True)
    mpv: Mapped[float] = mapped_column(index=True)

    cbc: Mapped["CBCPanel"] = relationship(back_populates="plt_panel")

class TEPPanel(Base):
    __tablename__ = "tep_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    test_date: Mapped[DateTime] = mapped_column(index=True)
    ca: Mapped[float] = mapped_column(index=True)
    phos: Mapped[float] = mapped_column(index=True)
    na: Mapped[float] = mapped_column(index=True)
    k: Mapped[float] = mapped_column(index=True)
    cl: Mapped[float] = mapped_column(index=True)
    mg: Mapped[float] = mapped_column(index=True)
    si: Mapped[float] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="tep_panel")

class SerumPanel(Base):
    __tablename__ = "serum_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("blood_test_event.id"), index=True)
    test_date: Mapped[DateTime] = mapped_column(index=True)

    event: Mapped["BloodTestEvent"] = relationship(back_populates="serum_panel")

class LiverPanel(Base):
    __tablename__ = "liver_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    serum_id: Mapped[int] = mapped_column(ForeignKey("serum_panel.id"), index=True)
    alt: Mapped[float] = mapped_column(index=True)
    ast: Mapped[float] = mapped_column(index=True)
    alp: Mapped[float] = mapped_column(index=True)
    ggt: Mapped[float] = mapped_column(index=True)
    tbli: Mapped[float] = mapped_column(index=True)
    nh3: Mapped[float] = mapped_column(index=True)

    serum: Mapped["SerumPanel"] = relationship(back_populates="liver_panel")

class DiabetesPanel(Base):
    __tablename__ = "diabetes_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    serum_id: Mapped[int] = mapped_column(ForeignKey("serum_panel.id"), index=True)
    tg: Mapped[float] = mapped_column(index=True)
    chol: Mapped[float] = mapped_column(index=True)

    serum: Mapped["SerumPanel"] = relationship(back_populates="diabetes_panel")

class KidneyPanel(Base):
    __tablename__ = "kidney_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    serum_id: Mapped[int] = mapped_column(ForeignKey("serum_panel.id"), index=True)
    bun: Mapped[float] = mapped_column(index=True)
    crea: Mapped[float] = mapped_column(index=True)
    phos: Mapped[float] = mapped_column(index=True)
    sdma: Mapped[float] = mapped_column(index=True)

    serum: Mapped["SerumPanel"] = relationship(back_populates="kidney_panel")


class PancreasPanel(Base):
    __tablename__ = "pancreas_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    serum_id: Mapped[int] = mapped_column(ForeignKey("serum_panel.id"), index=True)
    fpli: Mapped[float] = mapped_column(index=True)
    fsaa: Mapped[float] = mapped_column(index=True)
    fna: Mapped[float] = mapped_column(index=True)
    amyl: Mapped[float] = mapped_column(index=True)
    lip: Mapped[float] = mapped_column(index=True)
    fpl: Mapped[float] = mapped_column(index=True)
    cpl: Mapped[float] = mapped_column(index=True)

    serum: Mapped["SerumPanel"] = relationship(back_populates="pancreas_panel")

class ProteinPanel(Base):
    __tablename__ = "protein_panel"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    serum_id: Mapped[int] = mapped_column(ForeignKey("serum_panel.id"), index=True)
    tp: Mapped[float] = mapped_column(index=True)
    alb: Mapped[float] = mapped_column(index=True)
    glu: Mapped[float] = mapped_column(index=True)
    glob: Mapped[float] = mapped_column(index=True)

    serum: Mapped["SerumPanel"] = relationship(back_populates="protein_panel")