from sqlalchemy.orm import Session
from app import models

def get_words(db: Session):
    return db.query(models.Word).all()

def search_words(db: Session, search_term: str):
    return db.query(models.Word).filter(models.Word.word.contains(search_term)).all()