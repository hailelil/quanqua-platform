from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app import models, crud, schemas
from app.db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quanqua Admin Service")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/submissions/pending", response_model=list[schemas.Submission])
def get_pending(db: Session = Depends(get_db)):
    return crud.get_pending_submissions(db)

@app.post("/submissions/{submission_id}/approve", response_model=schemas.Submission)
def approve_submission(submission_id: int, db: Session = Depends(get_db)):
    return crud.update_submission_status(db, submission_id, "approved")

@app.post("/submissions/{submission_id}/reject", response_model=schemas.Submission)
def reject_submission(submission_id: int, db: Session = Depends(get_db)):
    return crud.update_submission_status(db, submission_id, "rejected")