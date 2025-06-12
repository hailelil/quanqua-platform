from sqlalchemy import Column, Integer, String
from app.db import Base

class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    source_language = Column(String, index=True)
    target_language = Column(String, index=True)
    word = Column(String, index=True)
    meaning = Column(String)