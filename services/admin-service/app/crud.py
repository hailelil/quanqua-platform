from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import models

# Add import path for Dictionary Service models
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dictionary-service/app')))

from models import Word  # Import Word model from Dictionary Service

# Setup connection to Dictionary DB → adjust path if needed
DICTIONARY_DB_URL = "sqlite:///../dictionary-service/words.db"
dictionary_engine = create_engine(DICTIONARY_DB_URL, connect_args={"check_same_thread": False})
DictionarySessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=dictionary_engine)

# Get pending submissions
def get_pending_submissions(db: Session):
    return db.query(models.Submission).filter(models.Submission.status == "pending").all()

# Update submission status
def update_submission_status(db: Session, submission_id: int, new_status: str):
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    
    if submission:
        submission.status = new_status
        db.commit()
        db.refresh(submission)

        # If approved → insert into Dictionary DB
        if new_status == "approved":
            dictionary_db = DictionarySessionLocal()
            try:
                # Check if word already exists in dictionary → avoid duplicates
                existing_word = dictionary_db.query(Word).filter(Word.word == submission.word).first()
                
                if existing_word is None:
                    word_obj = Word(
                        source_language=submission.source_language,
                        target_language=submission.target_language,
                        word=submission.word,
                        meaning=submission.meaning
                    )
                    dictionary_db.add(word_obj)
                    dictionary_db.commit()
                    print(f"✅ Inserted word '{submission.word}' into Dictionary DB.")
                else:
                    print(f"⚠️ Word '{submission.word}' already exists in Dictionary DB → skipping.")
            finally:
                dictionary_db.close()

    return submission