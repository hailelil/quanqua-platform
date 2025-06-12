from app.db import SessionLocal
from app import models

# Example word list → you can add more here!
words_data = [
    {
        "source_language": "Tigrigna",
        "target_language": "English",
        "word": "ትግርኛ",
        "meaning": "Tigrigna language"
    },
    {
        "source_language": "Tigrigna",
        "target_language": "English",
        "word": "ሰላም",
        "meaning": "peace"
    },
    {
        "source_language": "Tigrigna",
        "target_language": "Tigrigna",
        "word": "መምህር",
        "meaning": "ኣስተማማዕቲ"
    }
]

# Insert words
db = SessionLocal()

for word_data in words_data:
    word = models.Word(
        source_language=word_data["source_language"],
        target_language=word_data["target_language"],
        word=word_data["word"],
        meaning=word_data["meaning"]
    )
    db.add(word)

db.commit()
db.close()

print("✅ Test words inserted into DB.")
