import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const IEPFChecker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pan_number: '',
    folio_number: '',
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.full_name || !formData.email || !formData.phone) {
      toast.error('Please fill in Name, Email, and Phone');
      return;
    }

    // At least one search criterion required
    if (!formData.pan_number && !formData.folio_number && !formData.company_name) {
      toast.error('Please provide at least PAN, Folio Number, or Company Name');
      return;
    }

    // PAN validation if provided
    if (formData.pan_number) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(formData.pan_number)) {
        toast.error('Please enter a valid PAN number (e.g., ABCDE1234F)');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/iepf-check`, {
        pan_number: formData.pan_number || null,
        folio_number: formData.folio_number || null,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company_name || null,
        city: formData.city || null
      });

      if (response.data) {
        setSubmitted(true);
        toast.success('Request submitted! We\'ll email you the results within 24 hours.');
      }
    } catch (error) {
      console.error('Error submitting IEPF check:', error);
      toast.error('Failed to submit request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-xl border border-slate-200">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Request Submitted Successfully!
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We've received your IEPF share check request. Our team will verify your details against IEPF records and email you the results within 24 hours.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-amber-900 mb-2">What happens next?</h3>
                <ul className="text-left text-amber-800 space-y-2 text-sm">
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                    <span>Our experts will check MCA IEPF database</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                    <span>You'll receive detailed results via email</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                    <span>If shares found, we'll guide you through recovery</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
            <Search className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              Free IEPF Share Checker
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Unclaimed Shares & Dividends
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8">
            Search by PAN, Folio Number, or Company Name. We'll check IEPF records and email you the results within 24 hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-400 mb-1">Free</div>
              <div className="text-slate-300 text-sm">No charges</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-400 mb-1">24 Hours</div>
              <div className="text-slate-300 text-sm">Quick results</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-400 mb-1">Expert</div>
              <div className="text-slate-300 text-sm">Manual verification</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Enter Your Details
            </h2>
            <p className="text-slate-600 mb-6">
              Provide at least one: PAN, Folio Number, or Company Name
            </p>

            <div className="space-y-6">
              {/* Search Criteria Section */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-amber-900 mb-2">Search Options</h3>
                <p className="text-sm text-amber-800">
                  Provide at least ONE of the following: PAN Number, Folio Number, or Company Name
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    PAN NUMBER (Optional)
                  </label>
                  <input
                    type="text"
                    name="pan_number"
                    value={formData.pan_number}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    maxLength="10"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all uppercase"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    FOLIO NUMBER (Optional)
                  </label>
                  <input
                    type="text"
                    name="folio_number"
                    value={formData.folio_number}
                    onChange={handleChange}
                    placeholder="Enter folio number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  COMPANY NAME (Optional)
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="e.g., Reliance Industries, HDFC Bank"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Contact Details Section */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  FULL NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    EMAIL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    PHONE / WHATSAPP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  CITY (Optional)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> We'll manually check your details against IEPF MCA database and email you the results within 24 hours. This service is completely free. Provide at least one search criterion (PAN, Folio, or Company Name) for best results.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Check My Unclaimed Shares</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IEPFChecker;
