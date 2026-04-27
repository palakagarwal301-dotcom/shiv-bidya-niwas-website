import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

async def send_email_notification(inquiry_data: dict) -> bool:
    """
    Send email notification when a new inquiry is received.
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


async def send_iepf_check_notification(check_data: dict) -> bool:
    """
    Send email notification when a new IEPF check request is received.
    """
    
    try:
        # Email configuration
        recipient_email = os.environ.get('ADMIN_EMAIL', 'annudeep_65@yahoo.co.in')
        subject = f"🔍 New IEPF Share Check Request - {check_data['full_name']}"
        
        # Email body
        body = f"""
        New IEPF Share Check Request Received:
        
        PAN Number: {check_data['pan_number']}
        Full Name: {check_data['full_name']}
        Email: {check_data['email']}
        Phone: {check_data['phone']}
        Company Name: {check_data.get('company_name', 'Not provided')}
        
        Action Required:
        1. Login to admin dashboard: https://myiepfshares.in/admin/login
        2. Check IEPF records on MCA website
        3. Update status and send results to client
        
        ---
        Check ID: {check_data['id']}
        Requested at: {check_data['created_at']}
        Status: {check_data['status']}
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
        
        logger.info(f"IEPF check notification sent to {recipient_email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending IEPF check notification: {str(e)}")
        return False
