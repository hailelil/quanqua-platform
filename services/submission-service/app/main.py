from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app import models, crud, schemas
from app.db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quanqua Submission Service")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/submissions", response_model=schemas.Submission)
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    return crud.create_submission(db, submission)

@app.get("/submissions", response_model=list[schemas.Submission])
def read_submissions(db: Session = Depends(get_db)):
    return crud.get_submissions(db)