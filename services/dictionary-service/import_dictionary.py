# import_dictionary.py

import json
from app.db import SessionLocal
from app import models

# Path to your JSON file
JSON_FILE = "../../docs/extracted_entries_v6.json"

# Load JSON data
with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

# Open DB session
db = SessionLocal()

# Track how many inserted
count = 0

for entry in data:
    if "word" not in entry or not entry["word"]:
        print("Skipping entry with missing 'word'")
        continue

    # Prepare meanings as single string → join with newline
    meaning_text = "\n".join(entry.get("meanings", []))
    
    # Check if word already exists → avoid duplicates
    existing_word = db.query(models.Word).filter(models.Word.word == entry["word"]).first()
    
    if existing_word is None:
        word_obj = models.Word(
            source_language="Tigrigna",
            target_language="Tigrigna",
            word=entry["word"],
            meaning=meaning_text
            # If you add pronunciation field later, add here
            # pronunciation=entry["pronunciation"]
        )
        db.add(word_obj)
        count += 1
    else:
        print(f"Skipping duplicate: {entry['word']}")

# Commit changes
db.commit()
db.close()

print(f"✅ Imported {count} new words from {JSON_FILE}.")
