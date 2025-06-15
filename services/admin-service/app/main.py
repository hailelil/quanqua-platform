from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import uvicorn

from app import models, crud, schemas
from app.db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quanqua Admin Service")

# CORS configuration
origins = [
    "http://localhost:3000",
    "https://quanqua-frontend.onrender.com",
    "https://www.quanqua.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint: Get all pending submissions
@app.get("/submissions/pending", response_model=list[schemas.Submission])
def get_pending(db: Session = Depends(get_db)):
    return crud.get_pending_submissions(db)

# Endpoint: Approve a submission
@app.post("/submissions/{submission_id}/approve", response_model=schemas.Submission)
def approve_submission(submission_id: int, db: Session = Depends(get_db)):
    return crud.update_submission_status(db, submission_id, "approved")

# Endpoint: Reject a submission
@app.post("/submissions/{submission_id}/reject", response_model=schemas.Submission)
def reject_submission(submission_id: int, db: Session = Depends(get_db)):
    return crud.update_submission_status(db, submission_id, "rejected")

# Render-compatible entry point
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)