import React from 'react';
import { Mail, Phone, ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{companyInfo.name}</h3>
                <p className="text-xs text-amber-400">{companyInfo.tagline}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Helping investors and families recover unclaimed shares and lost investments from IEPF. Expert assistance, complete documentation, and transparent process.
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center space-x-2 text-slate-400 hover:text-amber-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{companyInfo.email}</span>
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center space-x-2 text-slate-400 hover:text-amber-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('process')}
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>IEPF Share Recovery</li>
              <li>Dividend Recovery</li>
              <li>Demat Transfer</li>
              <li>Share Transmission</li>
              <li>Share Tracing</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 {companyInfo.name}. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
