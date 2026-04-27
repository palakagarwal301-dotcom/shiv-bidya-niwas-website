from fastapi import APIRouter, HTTPException
from models.iepf_check import IEPFCheck, IEPFCheckCreate, IEPFCheckUpdate
from typing import List
import logging
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/iepf-check", response_model=IEPFCheck)
async def create_iepf_check(check: IEPFCheckCreate):
    """
    Create a new IEPF share check request
    """
    from server import db
    from services.email_service import send_iepf_check_notification
    
    try:
        # Create IEPF check object
        check_dict = check.dict()
        check_obj = IEPFCheck(**check_dict)
        
        # Save to database
        result = await db.iepf_checks.insert_one(check_obj.dict())
        
        logger.info(f"New IEPF check created: {check_obj.id} for PAN: {check_obj.pan_number}")
        
        # Send email notification to admin
        await send_iepf_check_notification(check_obj.dict())
        
        return check_obj
        
    except Exception as e:
        logger.error(f"Error creating IEPF check: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit IEPF check request")

@router.get("/iepf-checks", response_model=List[IEPFCheck])
async def get_all_iepf_checks():
    """
    Get all IEPF check requests (admin use)
    """
    from server import db
    
    try:
        checks = await db.iepf_checks.find().sort("created_at", -1).to_list(1000)
        # Remove MongoDB _id field
        for check in checks:
            check.pop('_id', None)
        return checks
    except Exception as e:
        logger.error(f"Error fetching IEPF checks: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch IEPF checks")

@router.get("/iepf-check/{check_id}", response_model=IEPFCheck)
async def get_iepf_check(check_id: str):
    """
    Get a specific IEPF check by ID
    """
    from server import db
    
    check = await db.iepf_checks.find_one({"id": check_id})
    if not check:
        raise HTTPException(status_code=404, detail="IEPF check not found")
    check.pop('_id', None)
    return check

@router.patch("/iepf-check/{check_id}", response_model=IEPFCheck)
async def update_iepf_check(check_id: str, update: IEPFCheckUpdate):
    """
    Update IEPF check status (admin use)
    """
    from server import db
    
    try:
        # Get existing check
        existing = await db.iepf_checks.find_one({"id": check_id})
        if not existing:
            raise HTTPException(status_code=404, detail="IEPF check not found")
        
        # Update fields
        update_dict = update.dict(exclude_unset=True)
        update_dict['updated_at'] = datetime.utcnow()
        
        # Update in database
        await db.iepf_checks.update_one(
            {"id": check_id},
            {"$set": update_dict}
        )
        
        # Get updated check
        updated_check = await db.iepf_checks.find_one({"id": check_id})
        updated_check.pop('_id', None)
        
        logger.info(f"IEPF check updated: {check_id} - Status: {update.status}")
        
        return updated_check
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating IEPF check: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update IEPF check")
