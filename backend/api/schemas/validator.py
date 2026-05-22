from pydantic import BaseModel,EmailStr,Field,HttpUrl
from typing import Optional,Dict,Any,Literal
from uuid import UUID
from datetime import datetime

class BaseSchema(BaseModel):
    model_config = {"from_attributes": True}

class UserSignup(BaseModel):
    name : str = Field(...,min_length=2,max_length=100)
    email : EmailStr
    password:str = Field(...,min_length=8,max_length=64)

class UserLogin(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):
    access_token : str

class UserOut(BaseSchema):
    id: UUID
    name: str
    email: EmailStr
    created_at: datetime

class EmailCheck(BaseModel):
    email: EmailStr

class PasswordVerify(BaseModel):
    password: str

# =================================================
# =================================================

class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    website_url: Optional[str] = Field(None, max_length=255)

class ProjectOut(BaseSchema):
    id: UUID
    user_id: UUID
    name: str
    website_url: Optional[str] = None
    project_id: str
    public_key: str
    created_at: datetime

# =================================================
# =================================================

class IssueUpdate(BaseModel):
    status: Optional[str] = Field(None, max_length=20)
    severity: Optional[str] = Field(None, max_length=20)

class IssueOut(BaseSchema):
    id: UUID
    project_id: str
    fingerprint: str
    title: str
    count: int
    status: str
    severity: str
    first_seen: datetime
    last_seen: datetime

# =======================================================================
# =======================================================================

class IngestPayload(BaseModel):
    projectId: str = Field(..., min_length=5, max_length=50)
    apiKey: str = Field(..., min_length=5, max_length=100)
    type: str = Field(..., min_length=2, max_length=50)  # e.g., js_error, promise_rejection, fetch_error
    message: str = Field(...)
    page: Optional[str] = Field(None, max_length=255)
    browser: Optional[str] = Field(None, max_length=100)
    stack: Optional[str] = Field(None)
    payload: Optional[Dict[str, Any]] = Field(None)

class LogOut(BaseSchema):
    id: UUID
    project_id: str
    issue_id: Optional[UUID] = None
    type: str
    message: str
    page: Optional[str] = None
    browser: Optional[str] = None
    stack: Optional[str] = None
    payload: Optional[Dict[str, Any]] = None
    created_at: datetime

# =======================================================================
# =======================================================================

class IssueStatusUpdate(BaseModel):
    status:Literal[
        "resolved",
        "unresolved",
        "ignored"
    ]