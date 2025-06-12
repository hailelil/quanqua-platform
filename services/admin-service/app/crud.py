from sqlalchemy.orm import Session
from app import models

def get_pending_submissions(db: Session):
    return db.query(models.Submission).filter(models.Submission.status == "pending").all()

def update_submission_status(db: Session, submission_id: int, new_status: str):
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    if submission:
        submission.status = new_status
        db.commit()
        db.refresh(submission)
    return submission