from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .. import models, db_models, database
import jwt

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

SECRET_KEY = "a_very_secret_key"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

@router.post("/register", response_model=models.User)
def register(user: models.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(db_models.User).filter(db_models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = db.query(db_models.User).filter(db_models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    db_user = db_models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        nickname=user.nickname,
        phone=user.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm=ALGORITHM)
    print(f"Verification link for {user.email}: http://localhost:3000/verify?token={token}")
    return db_user

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(db_models.User).filter(db_models.User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.verified:
        raise HTTPException(status_code=400, detail="Email not verified")
    return {"access_token": str(user.id), "token_type": "bearer"}

@router.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(database.get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        user = db.query(db_models.User).filter(db_models.User.email == email).first()
        if not user:
            raise HTTPException(status_code=400, detail="User not found")
        user.verified = True
        db.commit()
        db.refresh(user)
        return {"message": "Email verified successfully"}
    except jwt.PyJWTError:
        raise HTTPException(status_code=400, detail="Invalid token")
