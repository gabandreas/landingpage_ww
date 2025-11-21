'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah merespon consent sebelumnya
    const consent = Cookies.get('wewatch_cookie_consent');
    
    // Jika belum ada cookie 'wewatch_cookie_consent', tampilkan banner setelah 1 detik
    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Simpan keputusan user di cookie selama 365 hari
    Cookies.set('wewatch_cookie_consent', 'true', { expires: 365 });
    setShowBanner(false);
    
    // Di sini nanti tempat kita mengaktifkan Google Analytics (jika ada)
    // window.gtag('consent', 'update', { ... });
  };

  const handleDecline = () => {
    // Simpan keputusan user bahwa mereka menolak (opsional, atau biarkan kosong)
    Cookies.set('wewatch_cookie_consent', 'false', { expires: 365 });
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 z-50 max-w-xl"
        >
          <div className="bg-[#0E1425]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            {/* Icon */}
            <div className="bg-blue-500/20 p-3 rounded-full shrink-0">
              <Cookie className="w-6 h-6 text-blue-400" />
            </div>

            {/* Text */}
            <div className="flex-1 space-y-2">
              <h3 className="text-white font-semibold text-sm">We value your privacy</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                <a href="/privacy" className="text-blue-400 hover:underline ml-1">Read Policy</a>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-white text-black px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none bg-transparent border border-white/10 text-white px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors"
              >
                Decline
              </button>
            </div>

            {/* Close (Optional, usually Decline acts as close) */}
            <button onClick={handleDecline} className="absolute top-2 right-2 md:hidden text-gray-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}