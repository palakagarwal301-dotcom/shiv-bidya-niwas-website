import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SB</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                {companyInfo.name}
              </h1>
              <p className="text-xs text-amber-600">{companyInfo.tagline}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Contact */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href={`tel:${companyInfo.phone}`}
              className="w-10 h-10 bg-amber-600 text-white rounded-lg flex items-center justify-center hover:bg-amber-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
