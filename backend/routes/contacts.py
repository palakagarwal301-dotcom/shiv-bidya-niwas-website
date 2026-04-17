from fastapi import APIRouter, HTTPException
from models.contact import ContactInquiry, ContactInquiryCreate
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/contacts", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    """
    Create a new contact inquiry
    """
    from server import db
    
    try:
        # Create contact inquiry object
        inquiry_dict = inquiry.dict()
        inquiry_obj = ContactInquiry(**inquiry_dict)
        
        # Save to database
        result = await db.contact_inquiries.insert_one(inquiry_obj.dict())
        
        logger.info(f"New contact inquiry created: {inquiry_obj.id} from {inquiry_obj.email}")
        
        # TODO: Send email notification to annudeep_65@yahoo.co.in
        # This can be implemented with SendGrid, AWS SES, or SMTP
        
        return inquiry_obj
        
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit inquiry")

@router.get("/contacts")
async def get_all_inquiries():
    """
    Get all contact inquiries (for admin use)
    """
    from server import db
    
    try:
        # Exclude MongoDB's _id field to avoid serialization issues
        inquiries = await db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return inquiries
    except Exception as e:
        logger.error(f"Error fetching inquiries: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch inquiries")

@router.get("/contacts/{inquiry_id}")
async def get_inquiry(inquiry_id: str):
    """
    Get a specific inquiry by ID
    """
    from server import db
    
    inquiry = await db.contact_inquiries.find_one({"id": inquiry_id})
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry
