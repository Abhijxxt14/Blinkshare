import sqlite3

DB_FILE = "file_metadata.db"

def get_db():
    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS files (
            code TEXT PRIMARY KEY,
            file_path TEXT NOT NULL,
            expires_at REAL NOT NULL,
            original_name TEXT
        )
    """)
    try:
        cursor.execute("ALTER TABLE files ADD COLUMN original_name TEXT")
    except sqlite3.OperationalError:
        pass
    conn.commit()
    conn.close()
