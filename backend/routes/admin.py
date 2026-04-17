from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Get admin password from environment
ADMIN_PASSWORD_HASH = os.environ.get('ADMIN_PASSWORD_HASH', '')
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')

class LoginRequest(BaseModel):
    password: str

class LoginResponse(BaseModel):
    success: bool
    token: str = None
    message: str = None

@router.post("/admin/login", response_model=LoginResponse)
async def admin_login(request: LoginRequest):
    """
    Admin login endpoint with password verification
    """
    try:
        # Verify password
        if not ADMIN_PASSWORD_HASH:
            # Fallback for demo - remove in production
            if request.password == "admin123":
                token = jwt.encode(
                    {"admin": True, "exp": datetime.utcnow() + timedelta(days=1)},
                    JWT_SECRET,
                    algorithm="HS256"
                )
                return LoginResponse(success=True, token=token)
            else:
                raise HTTPException(status_code=401, detail="Invalid password")
        
        # Check hashed password
        if bcrypt.checkpw(request.password.encode('utf-8'), ADMIN_PASSWORD_HASH.encode('utf-8')):
            # Generate JWT token
            token = jwt.encode(
                {"admin": True, "exp": datetime.utcnow() + timedelta(days=1)},
                JWT_SECRET,
                algorithm="HS256"
            )
            logger.info("Admin login successful")
            return LoginResponse(success=True, token=token)
        else:
            logger.warning("Failed admin login attempt")
            raise HTTPException(status_code=401, detail="Invalid password")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during admin login: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")
