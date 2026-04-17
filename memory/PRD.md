# Shiv Bidya Niwas Pvt Ltd - Website PRD

## Project Overview
**Company**: Shiv Bidya Niwas Pvt Ltd  
**Purpose**: Professional website for IEPF Recovery & Financial Services  
**Type**: Landing page/Marketing website  
**Status**: Frontend MVP Complete ✓

## Contact Information
- **Phone**: +91 9830160265
- **Email**: annudeep_65@yahoo.co.in
- **Services**: Pan India (remote consultations available)
- **Working Hours**: Mon–Sat, 10am–6pm IST

## Core Requirements

### Pages & Sections
1. **Hero Section**
   - Company name and tagline
   - Strong value proposition
   - Clear CTAs (Start Recovery, How It Works)
   - Trust indicators (stats: ₹1200Cr+, 100% legal, Expert support)

2. **Services Section** (6 Services)
   - IEPF Share Recovery
   - Unclaimed Dividend Recovery
   - Demat Account Transfer
   - Transmission of Shares
   - Share Tracing & Verification
   - End-to-End Documentation

3. **Process Section** (5 Steps)
   - Free Consultation
   - Document Collection
   - Filing & Submission
   - Follow-Up & Tracking
   - Shares Credited

4. **About Section**
   - Company mission and story
   - Why Choose Us (4 key points)
   - Stats: 500+ cases, ₹5Cr+ recovered, 15+ states

5. **Testimonials Section**
   - 3 client testimonials (dummy data)
   - 5-star ratings
   - Client names and locations

6. **Contact Section**
   - Contact information (email, phone, hours, coverage)
   - Contact form (name, phone, email, service, message)

7. **Footer**
   - Company info
   - Quick links navigation
   - Services list
   - Contact details

## Technical Stack
- **Frontend**: React 19.0.0
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Notifications**: Sonner (toast)
- **Routing**: React Router DOM v7

## Design Guidelines
- **Color Scheme**: 
  - Primary: Navy blue (slate-900, slate-800)
  - Accent: Amber/Gold (amber-500, amber-600)
  - Background: White, Slate-50
- **Typography**: System fonts, bold headings
- **Icons**: Lucide React (NO emoji icons)
- **Effects**: Smooth transitions, hover states, glass-morphism on dark sections

## User Personas
1. **Senior Citizens** - Unaware of unclaimed shares/dividends
2. **Legal Heirs** - Need to transfer shares after demise of shareholder
3. **Investors** - Looking to recover IEPF shares or unclaimed dividends

## Implementation Status

### ✅ Completed (December 2024)
- [x] Project setup and configuration
- [x] Hero section with stats and CTAs
- [x] Services grid (6 cards)
- [x] Process flow (5 steps)
- [x] About section with Why Choose Us
- [x] Testimonials section (3 dummy testimonials)
- [x] Contact section with form
- [x] Footer with navigation
- [x] Responsive header with smooth scroll
- [x] **Backend API for contact form**
- [x] **MongoDB integration for storing inquiries**
- [x] **Contact form connected to backend**
- [x] **WhatsApp floating button**
- [x] **Email notification system (infrastructure ready)**
- [x] **Admin login page with password protection**
- [x] **Admin dashboard to view all inquiries**
- [x] **Filter inquiries by status (All, New, Contacted, Closed)**
- [x] **Stats display (Total, New, Contacted, Closed counts)**
- [x] Toast notifications for form submission
- [x] Smooth scroll navigation
- [x] Hover animations and transitions

### Current State
- **Status**: Complete full-stack application with admin panel ✅
- **Public Website**: https://site-creator-2006.preview.emergentagent.com
- **Admin Dashboard**: https://site-creator-2006.preview.emergentagent.com/admin/login
- **Admin Password**: admin123 (change in production)
- **Contact Form**: Fully functional - saves to MongoDB
- **Email System**: Infrastructure ready - add SendGrid/AWS SES API key to enable
- **Database**: Contact inquiries stored with all details
- **WhatsApp Button**: Working - opens WhatsApp with pre-filled message
- **Navigation**: Smooth scroll to sections working
- **Design**: Professional financial services aesthetic
- **Responsiveness**: Mobile-friendly design
- **Backend**: FastAPI with MongoDB running on port 8001
- **Frontend**: React app running on port 3000

## Next Steps

### Phase 1: Email Service Integration (5 minutes)
To enable email notifications when inquiries are received:
1. Choose email service: SendGrid (recommended) or AWS SES
2. Get API key from your chosen service
3. Add to `/app/backend/.env`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```
4. Uncomment the email sending code in `/app/backend/services/email_service.py`
5. Restart backend: `sudo supervisorctl restart backend`

### Phase 2: Production Security
- [ ] Change admin password in `/app/frontend/src/pages/AdminLogin.jsx`
- [ ] Add proper authentication (JWT tokens)
- [ ] Add HTTPS/SSL certificate
- [ ] Set up environment variables properly

### Phase 3: Domain & Deployment
- [ ] Add real client testimonials (when available)
- [ ] Blog/Resources section for IEPF guidelines
- [ ] FAQ section
- [ ] Case study showcase
- [ ] WhatsApp integration for quick contact
- [ ] File upload for document submission

### Phase 3: Deployment
- [ ] Domain setup (user to provide)
- [ ] DNS configuration
- [ ] SSL certificate
- [ ] Analytics integration (Google Analytics)
- [ ] SEO optimization

## API Contracts

### POST /api/contacts ✅ IMPLEMENTED
**Request:**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "service": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "phone": "string",
  "email": "string",
  "service": "string",
  "message": "string",
  "created_at": "datetime",
  "status": "new"
}
```

### GET /api/contacts ✅ IMPLEMENTED
Returns all contact inquiries (for admin use)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "phone": "string",
    "email": "string",
    "service": "string",
    "message": "string",
    "created_at": "datetime",
    "status": "new"
  }
]
```

### GET /api/contacts/{inquiry_id} ✅ IMPLEMENTED
Returns a specific inquiry by ID

## Notes
- Domain to be configured by client
- Real testimonials to be added once collected from clients
- **Email notifications can be added later with SendGrid/AWS SES**
- All contact inquiries are stored in MongoDB and can be accessed via `/api/contacts` endpoint
- WhatsApp button opens chat with pre-filled message about unclaimed shares
- Contact: +91 9830160265, annudeep_65@yahoo.co.in
