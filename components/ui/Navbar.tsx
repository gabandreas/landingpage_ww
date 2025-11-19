'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onLanguageChange: (lang: 'id' | 'en') => void;
  currentLanguage: 'id' | 'en';
}

export function Navbar({ onLanguageChange, currentLanguage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleLanguage = () => {
    onLanguageChange(currentLanguage === 'id' ? 'en' : 'id');
    setShowLangDropdown(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
        <div className="relative">
          <button 
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-white">
              {currentLanguage === 'id' ? 'Bahasa' : 'English'}
            </span>
            <svg 
              className={`w-4 h-4 text-white transition-transform duration-200 ${showLangDropdown ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {showLangDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-32 rounded-lg bg-gray-900 border border-white/10 backdrop-blur-lg shadow-xl overflow-hidden"
              >
                <button
                  onClick={() => {
                    onLanguageChange('en');
                    setShowLangDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    currentLanguage === 'en' 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('id');
                    setShowLangDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    currentLanguage === 'id' 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  Bahasa (ID)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
