import os
import time
import random
import string
import io
import qrcode
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Request
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, get_db
from models import FileUploadResponse
from sqlite3 import Connection

app = FastAPI(title="File Upload API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

@app.on_event("startup")
def startup_event():
    # Initialize the database table
    init_db()
    # Ensure the upload directory exists
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

def generate_code(length=6):
    # 6-digit numeric code for easy typing on phones
    return ''.join(random.choice(string.digits) for _ in range(length))

@app.post("/upload", response_model=FileUploadResponse)
async def upload_file(request: Request, file: UploadFile = File(...), db: Connection = Depends(get_db)):
    # Generate unique 6-digit numeric code
    code = generate_code(6)
    while db.execute("SELECT 1 FROM files WHERE code = ?", (code,)).fetchone():
        code = generate_code(6)

    # Prepare file path
    file_extension = os.path.splitext(file.filename)[1] if file.filename else ""
    filename = f"{code}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Save the file to disk
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Calculate expiration (current time + 5 hours)
    expires_at = time.time() + (5 * 3600)
    
    # Store metadata in SQLite
    original_name = file.filename
    db.execute(
        "INSERT INTO files (code, file_path, expires_at, original_name) VALUES (?, ?, ?, ?)",
        (code, file_path, expires_at, original_name)
    )
    db.commit()

    # Construct absolute URL using the request's base URL
    # This allows it to work over local network (e.g. 192.168.x.x)
    base_url = str(request.base_url).rstrip("/")
    full_url = f"{base_url}/file/{code}"

    return FileUploadResponse(
        url=full_url,
        code=code,
        expires_at=expires_at
    )

@app.get("/file/{code}")
async def get_file(code: str, db: Connection = Depends(get_db)):
    row = db.execute("SELECT file_path, expires_at, original_name FROM files WHERE code = ?", (code,)).fetchone()
    
    if not row:
        raise HTTPException(status_code=404, detail="File not found")
        
    file_path = row["file_path"]
    expires_at = row["expires_at"]
    original_name = row["original_name"]
    if not original_name:
        original_name = os.path.basename(file_path)
    
    # Check if the file has expired
    if time.time() > expires_at:
        db.execute("DELETE FROM files WHERE code = ?", (code,))
        db.commit()
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=410, detail="File has expired and been deleted")
        
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found on server")
        
    return FileResponse(file_path, filename=original_name)

@app.get("/qr/{code}")
async def get_qr(request: Request, code: str, db: Connection = Depends(get_db)):
    # Verify the code exists
    row = db.execute("SELECT 1 FROM files WHERE code = ?", (code,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="File not found")
        
    # Generate the access URL
    base_url = str(request.base_url).rstrip("/")
    full_url = f"{base_url}/file/{code}"
    
    # Create the QR Code image
    qr = qrcode.QRCode(box_size=10, border=2)
    qr.add_data(full_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save to a bytes buffer
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    
    return StreamingResponse(buf, media_type="image/png")
