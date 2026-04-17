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

### ✅ Completed (Date: 2024)
- [x] Project setup and configuration
- [x] Hero section with stats and CTAs
- [x] Services grid (6 cards)
- [x] Process flow (5 steps)
- [x] About section with Why Choose Us
- [x] Testimonials section (3 dummy testimonials)
- [x] Contact section with form
- [x] Footer with navigation
- [x] Responsive header with smooth scroll
- [x] Mock data structure
- [x] Toast notifications for form submission
- [x] Smooth scroll navigation
- [x] Hover animations and transitions

### Current State
- **Status**: Frontend-only MVP with mock data
- **Contact Form**: Shows toast notification (not connected to backend)
- **Navigation**: Smooth scroll to sections working
- **Design**: Professional financial services aesthetic
- **Responsiveness**: Mobile-friendly design

## Next Steps

### Phase 1: Backend Integration (Optional)
If backend functionality is needed:
- [ ] Create FastAPI backend
- [ ] MongoDB models for contact inquiries
- [ ] Email notification service (send emails to annudeep_65@yahoo.co.in)
- [ ] Contact form API endpoint
- [ ] Admin dashboard to view inquiries

### Phase 2: Enhanced Features (Optional)
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

## API Contracts (When Backend is Built)

### POST /api/contact
Request:
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "service": "string",
  "message": "string"
}
```

Response:
```json
{
  "success": true,
  "message": "We'll contact you within 24 hours"
}
```

## Notes
- Domain to be configured by client
- Real testimonials to be added once collected from clients
- Email integration needed when backend is implemented
- Current implementation is frontend-only with mock data for quick preview
