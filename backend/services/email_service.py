import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

async def send_email_notification(inquiry_data: dict) -> bool:
    """
    Send email notification when a new inquiry is received.
    
    This is a placeholder function. To enable email notifications:
    1. Choose an email service (SendGrid, AWS SES, or SMTP)
    2. Add API keys to .env file
    3. Implement the actual email sending logic below
    
    Example with SendGrid:
    - Install: pip install sendgrid
    - Add SENDGRID_API_KEY to .env
    - Uncomment and configure the SendGrid code
    
    Example with SMTP:
    - Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD to .env
    - Uncomment and configure the SMTP code
    """
    
    try:
        # Email configuration
        recipient_email = "annudeep_65@yahoo.co.in"
        subject = f"New Contact Inquiry from {inquiry_data['name']}"
        
        # Email body
        body = f"""
        New contact inquiry received:
        
        Name: {inquiry_data['name']}
        Phone: {inquiry_data['phone']}
        Email: {inquiry_data['email']}
        Service Required: {inquiry_data['service']}
        
        Message:
        {inquiry_data['message']}
        
        ---
        Inquiry ID: {inquiry_data['id']}
        Received at: {inquiry_data['created_at']}
        """
        
        # TODO: Implement actual email sending
        # Option 1: SendGrid (Recommended)
        # from sendgrid import SendGridAPIClient
        # from sendgrid.helpers.mail import Mail
        # 
        # message = Mail(
        #     from_email='noreply@shivbidyaniwas.com',
        #     to_emails=recipient_email,
        #     subject=subject,
        #     plain_text_content=body
        # )
        # sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        # response = sg.send(message)
        # return response.status_code == 202
        
        # Option 2: SMTP (Gmail, etc.)
        # import smtplib
        # from email.mime.text import MIMEText
        # 
        # msg = MIMEText(body)
        # msg['Subject'] = subject
        # msg['From'] = os.environ.get('SMTP_USER')
        # msg['To'] = recipient_email
        # 
        # with smtplib.SMTP(os.environ.get('SMTP_HOST'), int(os.environ.get('SMTP_PORT', 587))) as server:
        #     server.starttls()
        #     server.login(os.environ.get('SMTP_USER'), os.environ.get('SMTP_PASSWORD'))
        #     server.send_message(msg)
        # return True
        
        # For now, just log the email (no actual sending)
        logger.info(f"Email notification prepared for {recipient_email}")
        logger.info(f"Subject: {subject}")
        logger.info(f"Body preview: {body[:100]}...")
        
        return True
        
    except Exception as e:
        logger.error(f"Error sending email notification: {str(e)}")
        return False
