from sqlalchemy.orm import Session
from app import models, schemas

def create_submission(db: Session, submission: schemas.SubmissionCreate):
    db_submission = models.Submission(
        source_language=submission.source_language,
        target_language=submission.target_language,
        word=submission.word,
        meaning=submission.meaning,
        status="pending"
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

def get_submissions(db: Session):
    return db.query(models.Submission).all()