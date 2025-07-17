from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import cats, health_records, auth
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import EmailStr
import jwt

app = FastAPI()

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # The address of the React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME="your_email@example.com",
    MAIL_PASSWORD="your_password",
    MAIL_FROM="your_email@example.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.example.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    MAIL_DEBUG=True, # Prints emails to console
)

SECRET_KEY = "a_very_secret_key"
ALGORITHM = "HS256"

@app.post("/email")
async def send_email(email: EmailStr):
    token = jwt.encode({"email": email}, SECRET_KEY, algorithm=ALGORITHM)
    message = MessageSchema(
        subject="Cat Health Tracker Email Verification",
        recipients=[email],
        body=f"Please click the following link to verify your email: http://localhost:3000/verify?token={token}",
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "Email has been sent"}

@app.get("/verify")
def verify_email(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        # Here you would update the user's `verified` status in your database
        return {"message": "Email verified successfully"}
    except jwt.PyJWTError:
        return {"message": "Invalid token"}

app.include_router(auth.router)
app.include_router(cats.router)
app.include_router(health_records.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Cat Health Tracker API"}
