from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app import models, crud, schemas
from app.db import SessionLocal, engine

import random


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quanqua Dictionary Service")

# CORS middleware → required for frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

@app.get("/words", response_model=list[schemas.Word])
def read_words(search: str = "", db: Session = Depends(get_db)):
    if search:
        return crud.search_words(db, search)
    else:
        return crud.get_words(db)
    
@app.get("/words/random", response_model=list[schemas.Word])
def get_random_words(count: int = 5, db: Session = Depends(get_db)):
    all_words = db.query(models.Word).all()
    random_words = random.sample(all_words, min(count, len(all_words)))
    return random_words