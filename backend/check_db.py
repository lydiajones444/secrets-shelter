import sqlite3
import os

db_path = 'db.sqlite3'
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'api_%'")
    tables = [row[0] for row in cursor.fetchall()]
    print(f"API tables found: {tables}")
    conn.close()
else:
    print("Database file not found")
