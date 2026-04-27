from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class IEPFCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Search criteria (at least one required)
    pan_number: Optional[str] = None
    folio_number: Optional[str] = None
    full_name: str
    email: EmailStr
    phone: str
    company_name: Optional[str] = None
    city: Optional[str] = None
    # Status tracking
    status: str = "pending"  # pending, checked, has_shares, no_shares
    notes: Optional[str] = None
    checked_by: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
class IEPFCheckCreate(BaseModel):
    pan_number: Optional[str] = None
    folio_number: Optional[str] = None
    full_name: str
    email: EmailStr
    phone: str
    company_name: Optional[str] = None
    city: Optional[str] = None

class IEPFCheckUpdate(BaseModel):
    status: str
    notes: Optional[str] = None
    checked_by: Optional[str] = None
