'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; 

const getAppStoreUrl = () => {
  const iOS_URL = "https://apps.apple.com/id/app/wewatch-everywhere/id1533557464"; 
  return iOS_URL;
};

const content = {
  en: {
    title: "Unlimited Entertainment",
    subtitle: "Here. There. Everywhere",
    cta: "Start Your Free Trial",
    placeholder: "812 3456 7890",
    submit: "Get Started",
    // disclaimer: "Free trial available for new subscribers only. Terms apply.",
    features: [
      { title: "Live TV", image: "/images/livestreaming.png" },
      { title: "Video On Demand", image: "/images/vod.png" },
      { title: "Short Drama", image: "/images/short_drama.png" }
    ]
  },
  id: {
    title: "Hiburan Tanpa Batas",
    subtitle: "Disini. Disana. Dimana-mana",
    cta: "Mulai Masa Percobaan",
    placeholder: "812 3456 7890",
    submit: "Mulai",
    disclaimer: "Masa percobaan hanya untuk pelanggan baru. Syarat dan ketentuan berlaku.",
    features: [
      { title: "Saluran TV", image: "/images/livestreaming.png" },
      { title: "Film", image: "/images/vod.png" },
      { title: "Drama Pendek", image: "/images/short_drama.png" }
    ]
  }
};

export function HeroSection() {
  const { language, setLanguage } = useLanguage(); 
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  const [isInputMode, setIsInputMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // STATE BARU: Default +62, nanti berubah otomatis by IP
  const [countryCode, setCountryCode] = useState("+62"); 

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0.35]);
  const currentContent = content[language];

  // Effect 1: Deteksi IP User untuk Kode Negara
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        // Fetch ke API publik (ipapi.co biasanya gratis dan akurat)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Jika berhasil dapat kode (misal: +62, +1, +65), update state
        if (data.country_calling_code) {
          setCountryCode(data.country_calling_code);
        }
      } catch (error) {
        console.error("Gagal mendeteksi lokasi pengguna:", error);
        // Jika gagal (misal adblocker), dia akan tetap pakai default +62
      }
    };

    fetchCountryCode();
  }, []);

  // Effect 2: Auto-scroll feature pills
  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredItem(prev => prev === null || prev >= 2 ? 0 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex: Hanya izinkan angka
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 8) {
        alert(language === 'id' ? "Nomor terlalu pendek" : "Number too short");
        return;
    }
    // Gabungkan Kode Negara (dari IP) + Nomor Inputan
    const fullNumber = `${countryCode}${phoneNumber}`;
    console.log("Nomor HP Submitted:", fullNumber);
    alert(`Mengirim kode OTP ke: ${fullNumber}`);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden bg-[#040714] min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Navbar / Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="h-10 w-32 relative pointer-events-auto">
          <Image
            src="/images/wewatch_logo2.png"
            alt="WeWatch"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <div className="relative pointer-events-auto">
          <button 
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200 backdrop-blur-md"
          >
            <span className="text-sm font-medium text-white">
              {language === 'id' ? 'Bahasa' : 'English'}
            </span>
            <svg className={`w-4 h-4 text-white transition-transform duration-200 ${showLangDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {showLangDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-40 rounded-lg bg-[#040714] border border-white/10 backdrop-blur-lg shadow-xl overflow-hidden z-50"
              >
                <button onClick={() => { setLanguage('en'); setShowLangDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-blue-600/20 text-blue-400' : 'text-white hover:bg-white/5'}`}>English (EN)</button>
                <button onClick={() => { setLanguage('id'); setShowLangDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'id' ? 'bg-blue-600/20 text-blue-400' : 'text-white hover:bg-white/5'}`}>Bahasa Indonesia (ID)</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ opacity: glowOpacity }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-[#28c2ff]/5 via-transparent to-[#28c2ff]/5"
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* === MAIN HERO CONTENT === */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8 px-4"
        >
          <motion.h1 
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentContent.title}
          </motion.h1>
          
          <div className="relative inline-block">
            <motion.p 
              className="mx-auto max-w-2xl text-xl text-gray-300 sm:text-2xl relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {currentContent.subtitle}
              <motion.span 
                className="absolute left-0 -bottom-1 w-0 h-px bg-gradient-to-r from-[#28c2ff] via-[#007aff] to-[#28c2ff]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
              />
            </motion.p>
          </div>
          
          {/* Feature Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {currentContent.features.map((feature, i) => (
              <div 
                key={i}
                className={`relative group overflow-hidden rounded-xl w-40 h-24 transition-all duration-300 ${
                  hoveredItem === i ? 'ring-2 ring-blue-500 scale-105' : 'ring-1 ring-white/10'
                }`}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="absolute inset-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm font-medium text-center">
                  {feature.title}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* === CTA BUTTON & INPUT TRANSITION === */}
          <div className="mt-10 h-20 flex justify-center items-center relative w-full max-w-lg mx-auto">
            <AnimatePresence mode='wait'>
              {!isInputMode ? (
                // MODE 1: TOMBOL CTA (Awal) - Style Glassmorphism
                <motion.button
                  key="cta-button"
                  onClick={() => setIsInputMode(true)}
                  className="px-8 py-4 text-lg font-semibold text-white rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {currentContent.cta}
                </motion.button>
              ) : (
                // MODE 2: INPUT FORM
                <motion.form
                  key="input-form"
                  onSubmit={handlePhoneSubmit}
                  className="relative flex w-full max-w-md items-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="relative w-full flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 pr-1 shadow-2xl">
                     
                     {/* Icon Phone */}
                     <div className="pl-4 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                     </div>

                     {/* Kode Negara (Dinamis by IP) */}
                     <div className="flex items-center px-3 border-r border-white/20 h-6">
                        {/* Tampilkan kode negara yang didapat dari API */}
                        <span className="text-white font-medium">{countryCode}</span>
                     </div>
                     
                     {/* Input Field */}
                     <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder={currentContent.placeholder}
                        className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 text-base py-3 pl-3"
                        autoFocus
                        maxLength={15}
                     />

                     {/* Submit Button */}
                     <button 
                       type="submit"
                       className="ml-2 p-3 rounded-full text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all hover:scale-110 active:scale-90 flex-shrink-0"
                     >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </button>
                  </div>
                  
                  {/* Tombol Cancel (X) */}
                  <button 
                    type="button"
                    onClick={() => setIsInputMode(false)}
                    className="absolute -right-8 text-gray-500 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <motion.p 
            className="text-sm text-gray-500 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {currentContent.disclaimer}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}