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
        recipient_email = os.environ.get('ADMIN_EMAIL', 'annudeep_65@yahoo.co.in')
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
        
        # Yahoo SMTP Email Sending
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        
        # Create email message
        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = os.environ.get('SMTP_USER', 'annudeep_65@yahoo.co.in')
        msg['To'] = recipient_email
        msg.attach(MIMEText(body, 'plain'))
        
        # Send via Yahoo SMTP
        with smtplib.SMTP('smtp.mail.yahoo.com', 587) as server:
            server.starttls()
            server.login(
                os.environ.get('SMTP_USER', 'annudeep_65@yahoo.co.in'),
                os.environ.get('SMTP_PASSWORD')
            )
            server.send_message(msg)
        
        logger.info(f"Email sent successfully to {recipient_email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending email notification: {str(e)}")
        return False
