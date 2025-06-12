from pydantic import BaseModel

class Word(BaseModel):
    id: int
    source_language: str
    target_language: str
    word: str
    meaning: str

    class Config:
        orm_mode = True