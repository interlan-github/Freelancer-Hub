import os
import psycopg2
import psycopg2.extras
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator


DATABASE_URL = os.environ.get("DATABASE_URL")


def get_connection():
    return psycopg2.connect(DATABASE_URL)


def init_db():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS contact_submissions (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    subject VARCHAR(500) NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    ip_address VARCHAR(45)
                )
            """)
        conn.commit()
    finally:
        conn.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Contact Form API",
    description="Accepts contact form submissions and saves them to PostgreSQL",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


class ContactFormData(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def name_min_length(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v.strip()

    @field_validator("subject")
    @classmethod
    def subject_min_length(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Subject is required")
        return v.strip()

    @field_validator("message")
    @classmethod
    def message_min_length(cls, v: str) -> str:
        if len(v.strip()) < 10:
            raise ValueError("Message must be at least 10 characters")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[int] = None


class SubmissionRecord(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    ip_address: Optional[str]


@app.get("/contact-api/healthz")
def healthz():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/contact-api/submit", response_model=ContactResponse)
async def submit_contact(data: ContactFormData, request: Request):
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else None)
    if ip:
        ip = ip.split(",")[0].strip()

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO contact_submissions (name, email, subject, message, ip_address)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                (data.name, data.email, data.subject, data.message, ip),
            )
            row = cur.fetchone()
            submission_id = row[0] if row else None
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        conn.close()

    return ContactResponse(
        success=True,
        message="Your message has been received. I will get back to you soon!",
        id=submission_id,
    )


@app.get("/contact-api/submissions", response_model=list[SubmissionRecord])
def list_submissions():
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                "SELECT id, name, email, subject, message, created_at, ip_address "
                "FROM contact_submissions ORDER BY created_at DESC LIMIT 100"
            )
            rows = cur.fetchall()
    finally:
        conn.close()
    return [SubmissionRecord(**dict(row)) for row in rows]
