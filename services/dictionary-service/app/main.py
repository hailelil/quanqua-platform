from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app import models, crud, schemas
from app.db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quanqua Dictionary Service")

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