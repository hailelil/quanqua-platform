from pydantic import BaseModel
from datetime import datetime

class Submission(BaseModel):
    id: int
    source_language: str
    target_language: str
    word: str
    meaning: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True