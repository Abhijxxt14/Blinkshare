from pydantic import BaseModel

class FileUploadResponse(BaseModel):
    url: str
    code: str
    expires_at: float
