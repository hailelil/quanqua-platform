from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app import models, crud, schemas
from app.db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quanqua Admin Service")

# Add CORS middleware → required for frontend calls!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get pending submissions
@app.get("/submissions/pending", response_model=list[schemas.Submission])
def get_pending(db: Session = Depends(get_db)):
    return crud.get_pending_submissions(db)

# Approve a submission
@app.post("/submissions/{submission_id}/approve", response_model=schemas.Submission)
def approve_submission(submission_id: int, db: Session = Depends(get_db)):
    return crud.update_submission_status(db, submission_id, "approved")

# Reject a submission
@app.post("/submissions/{submission_id}/reject", response_model=schemas.Submission)
def reject_submission(submission_id: int, db: Session = Depends(get_db)):
    return crud.update_submission_status(db, submission_id, "rejected")
