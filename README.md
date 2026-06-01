# Blynq - File Sharing Application

A modern, fast file-sharing application built with FastAPI backend and Next.js frontend. Share files quickly with unique numeric codes and QR codes.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Deployment](#deployment)

## 🎯 Overview

Blynq is a file-sharing platform that enables users to upload files and receive unique 6-digit numeric codes and QR codes for easy sharing. Files are stored temporarily with automatic expiration, and the system supports large file uploads up to 5GB.

## ✨ Features

- **Quick File Sharing**: Upload files and get a unique 6-digit code instantly
- **QR Code Generation**: Automatic QR code generation for easy mobile access
- **Large File Support**: Upload files up to 5GB with chunk-based streaming
- **Auto-Expiration**: Files automatically expire after 5 hours
- **Responsive UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **CORS Enabled**: Secure cross-origin resource sharing configured
- **Persistent Storage**: Dedicated storage disk for file management

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Server**: Uvicorn
- **Database**: SQLite
- **Key Libraries**:
  - `fastapi` - Web framework
  - `uvicorn` - ASGI server
  - `python-multipart` - File upload handling
  - `qrcode` - QR code generation
  - `pillow` - Image processing
  - `python-cors` - CORS middleware

### Frontend
- **Framework**: Next.js 14.2.3
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.3
- **PostCSS**: Autoprefixer for CSS compatibility
- **Runtime**: Node.js

### Infrastructure
- **Hosting**: Render.com
- **Storage**: Persistent disk (100GB)
- **Memory**: 2GB RAM
- **CPU**: 2 cores
- **Python Version**: 3.11

## 📁 Project Structure

```
blynq/
├── backend/
│   ├── main.py                 # FastAPI application and routes
│   ├── models.py               # Pydantic data models
│   ├── database.py             # SQLite database initialization and connection
│   ├── requirements.txt         # Python dependencies
│   ├── uploads/                # File storage directory (created at runtime)
│   └── file_metadata.db        # SQLite database file (created at runtime)
├── frontend/
│   ├── app/
│   │   ├── layout.js           # Root layout component
│   │   ├── page.js             # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── BackgroundGlow.jsx   # Animated background effect
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Hero.jsx             # Hero section with headline
│   │   ├── UploadSection.jsx    # File upload component
│   │   ├── ResultCard.jsx       # Display upload result with code and QR
│   │   ├── ReceiveInput.jsx     # Input for receiving files by code
│   │   ├── Toast.jsx            # Notification toast component
│   │   ├── Workflow.jsx         # Workflow steps visualization
│   │   └── Footer.jsx           # Footer component
│   ├── hooks/
│   │   └── useToast.js          # Custom hook for toast notifications
│   ├── public/                 # Static assets
│   ├── package.json            # npm dependencies
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── jsconfig.json            # JavaScript path configuration
│   └── vercel.json              # Deployment configuration
└── render.yaml                 # Render.com deployment configuration
```

## 💾 Installation

### Prerequisites

- **Python 3.11+** - Required for backend
- **Node.js 16+** - Required for frontend
- **npm 8+** - Package manager for frontend

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Option 1: Running Both Servers in Separate Terminals

**Terminal 1 - Start Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

The backend will start on `http://127.0.0.1:8000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Option 2: Production Build

**Backend:**
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

## 📡 API Documentation

### Base URL
- Development: `http://127.0.0.1:8000`
- Production: Render.com deployed URL

### Endpoints

#### Upload File
- **Endpoint**: `POST /upload`
- **Description**: Upload a file and receive a unique code and QR code URL
- **Request Body**: 
  - `file` (File): The file to upload (multipart/form-data)
- **Response**:
  ```json
  {
    "url": "http://127.0.0.1:8000/file/123456",
    "code": "123456",
    "expires_at": 1716036900.0
  }
  ```
- **Max File Size**: 5GB
- **Status Codes**:
  - `200`: File uploaded successfully
  - `400`: Upload failed
  - `413`: File size exceeds 5GB limit

#### Download File
- **Endpoint**: `GET /file/{code}`
- **Description**: Download a file by its numeric code
- **Path Parameters**:
  - `code` (string): 6-digit numeric code
- **Response**: File binary data
- **Status Codes**:
  - `200`: File found and returned
  - `404`: File not found or expired

#### Get File Info
- **Endpoint**: `GET /file-info/{code}`
- **Description**: Get metadata about a file
- **Path Parameters**:
  - `code` (string): 6-digit numeric code
- **Response**:
  ```json
  {
    "code": "123456",
    "original_name": "document.pdf",
    "expires_at": 1716036900.0,
    "expires_in_seconds": 45
  }
  ```

#### Health Check
- **Endpoint**: `GET /`
- **Description**: Check API health status
- **Response**: `{"status": "ok"}`

## 💾 Database Schema

### SQLite Tables

#### `files` Table
Stores metadata for uploaded files

| Column | Type | Description |
|--------|------|-------------|
| `code` | TEXT (PRIMARY KEY) | Unique 6-digit numeric code |
| `file_path` | TEXT | Full path to the stored file |
| `expires_at` | REAL | Unix timestamp when file expires |
| `original_name` | TEXT | Original filename uploaded by user |

**Example:**
```
code: "123456"
file_path: "/uploads/123456.pdf"
expires_at: 1716036900.0
original_name: "report.pdf"
```

## ⚙️ Configuration

### Environment Variables

**Backend:**
- `UPLOAD_DIR` - Directory for file storage (default: `./uploads`)
- `PYTHON_VERSION` - Python version (default: `3.11`)
- `PORT` - Server port (default: `8000`)

**Frontend:**
- API base URL is configured in components (default: `http://127.0.0.1:8000`)

### CORS Configuration

The backend allows requests from all origins (`*`). For production, update this in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["your-domain.com"],  # Restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Tailwind CSS

Tailwind is configured in `frontend/tailwind.config.js`. Customize theme colors and extend configurations there.

## 🌐 Deployment

### Deploy to Render.com

1. Create a Render account and connect your GitHub repository
2. The project includes `render.yaml` with deployment configuration
3. Set up environment variables in Render dashboard:
   - `UPLOAD_DIR=/opt/render/uploads`
   - `PORT=8000`

### Key Deployment Settings (from render.yaml)

- **Runtime**: Python 3.11
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT --workers 1`
- **Storage**: 100GB persistent disk at `/opt/render/uploads`
- **Memory**: 2GB RAM
- **CPU**: 2 cores

### File Expiration

Files expire 5 hours after upload. The system will:
1. Store expiration time in SQLite
2. Delete expired files automatically (implement cleanup script for production)

## 📝 Development Tips

### Frontend Development
- Hot reload enabled with `npm run dev`
- Use `npm run lint` to check code quality
- Build with `npm run build`

### Backend Development
- API auto-reloads with `--reload` flag
- Access API docs at `http://127.0.0.1:8000/docs` (Swagger UI)
- Alternative docs at `http://127.0.0.1:8000/redoc`

### Debugging

**Backend Logs:**
```bash
cd backend
python -m uvicorn main:app --reload --log-level debug
```

**Frontend Logs:**
- Check browser console in DevTools
- Check terminal output during development

## 🔐 Security Considerations

1. **File Validation**: Implement file type validation in production
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **CORS**: Restrict CORS origins to trusted domains
4. **File Cleanup**: Implement automatic cleanup for expired files
5. **Virus Scanning**: Consider adding virus scanning for large deployments
6. **HTTPS**: Use HTTPS in production

## 📦 Dependencies Summary

### Backend (Python)
```
fastapi==latest
uvicorn==latest
python-multipart==latest
qrcode==latest
pillow==latest
```

### Frontend (Node.js)
```
next==14.2.3
react==18.3.1
react-dom==18.3.1
tailwindcss==3.4.3
postcss==8.4.38
autoprefixer==10.4.19
```

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow existing code style
3. Test both frontend and backend before pushing
4. Update this README with any new features

## 📄 License

[Add your license here]

## 📞 Support

For issues or questions:
1. Check the API documentation at `/docs` (backend)
2. Review component structure in `frontend/components/`
3. Check database logs in `file_metadata.db`

---

**Last Updated**: May 2026
**Version**: 1.0.0
