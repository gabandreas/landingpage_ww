'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; 

// --- DATA CONTENT ---
const content = {
  en: {
    title: "Unlimited Entertainment",
    subtitle: "Here. There. Everywhere.",
    cta_text: "Start Your Free Trial",
    cta_subtext: "Register in-app to unlock free access.",
    store: { get: "Get it on", download: "Download on", explore: "Explore on" },
    steps: [
      { title: "Download App", desc: "Get WeWatch from store" },
      { title: "Register Free", desc: "Create account in seconds" },
      { title: "Start Watching", desc: "Enjoy content instantly" }
    ]
  },
  id: {
    title: "Hiburan Tanpa Batas",
    subtitle: "Disini. Disana. Dimana-mana.",
    cta_text: "Mulai Coba Gratis",
    cta_subtext: "Registrasi di aplikasi untuk akses gratis.",
    store: { get: "Temukan di", download: "Unduh di", explore: "Jelajahi di" },
    steps: [
      { title: "Unduh Aplikasi", desc: "Dapatkan WeWatch di store" },
      { title: "Daftar Gratis", desc: "Buat akun dalam hitungan detik" },
      { title: "Mulai Nonton", desc: "Nikmati konten langsung" }
    ]
  }
};

// --- MOVIE POSTERS ---
const column1 = ["/images/sight_unseen.jpg", "/images/wicked.jpg", "/images/fbi.jpg", "/images/elalamein.jpg"];
const column2 = ["/images/king_of_devil_island.jpg", "/images/love_at_first_fight.jpg", "/images/mammal.jpg", "/images/joy_of.jpg"];
const column3 = ["/images/seal_team.jpg", "/images/the_exception.jpg", "/images/sight_unseen.jpg", "/images/wicked.jpg"];

// --- COMPONENT BUTTON ---
interface StoreButtonProps { href: string; iconPath: React.ReactNode; subText: string; mainText: string; }
const StoreButton = ({ href, iconPath, subText, mainText }: StoreButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(href)}&color=000000&bgcolor=ffffff`;

  return (
    <div className="relative group w-full sm:w-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden lg:flex flex-col items-center z-50">
            <div className="bg-white p-2 rounded-xl shadow-2xl border border-white/20">
               <div className="relative w-24 h-24 rounded-lg overflow-hidden"><Image src={qrImage} alt="Scan" fill className="object-contain" unoptimized /></div>
            </div>
            <div className="w-3 h-3 bg-white rotate-45 -mt-1.5"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-3 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 w-full sm:min-w-[160px]">
         {iconPath}
         <div className="text-left">
           <div className="text-[9px] uppercase leading-none text-gray-400 mb-0.5">{subText}</div>
           <div className="text-sm font-semibold text-white">{mainText}</div>
         </div>
      </a>
    </div>
  );
};

export function HeroSection() {
  const { language, setLanguage } = useLanguage(); 
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const t = content[language];

  // LOGIC SMART NAVBAR
  const { scrollY } = useScroll();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Jika scroll ke bawah lebih dari 50px dan posisi saat ini > 50px, sembunyikan navbar
    if (latest > previous && latest > 50) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
  });

  return (
    <section ref={sectionRef} id="home" className="relative w-full overflow-hidden bg-black min-h-[100dvh] flex flex-col">
      
      {/* === 1. BACKGROUND ANIMATION (Marquee Effect) === */}
      <div className="absolute inset-0 overflow-hidden opacity-100 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black z-10" />
         
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 p-4 h-[150%] -mt-20 transform -rotate-6 scale-105 origin-center">
            {/* ... (Bagian Grid Poster sama seperti sebelumnya, disingkat untuk kerapian) ... */}
            {/* Kolom 1 */}
            <div className="flex flex-col gap-4 sm:gap-6">
               <motion.div animate={{ y: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="flex flex-col gap-4 sm:gap-6">
                  {[...column1, ...column1, ...column1].map((src, i) => (<div key={i} className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-gray-900"><Image src={src} alt="Poster" fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" priority={i < 4} /></div>))}
               </motion.div>
            </div>
            {/* Kolom 2 */}
            <div className="flex flex-col gap-4 sm:gap-6 mt-20">
               <motion.div animate={{ y: [-1000, 0] }} transition={{ repeat: Infinity, duration: 55, ease: "linear" }} className="flex flex-col gap-4 sm:gap-6">
                  {[...column2, ...column2, ...column2].map((src, i) => (<div key={i} className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-gray-900"><Image src={src} alt="Poster" fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" /></div>))}
               </motion.div>
            </div>
            {/* Kolom 3 */}
            <div className="flex flex-col gap-6 hidden sm:flex">
               <motion.div animate={{ y: [0, -1000] }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} className="flex flex-col gap-6">
                  {[...column3, ...column3, ...column3].map((src, i) => (<div key={i} className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-gray-900"><Image src={src} alt="Poster" fill className="object-cover" sizes="20vw" /></div>))}
               </motion.div>
            </div>
             {/* Kolom 4 */}
             <div className="flex flex-col gap-6 mt-10 hidden lg:flex">
               <motion.div animate={{ y: [-1000, 0] }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="flex flex-col gap-6">
                  {[...column1, ...column2, ...column1].map((src, i) => (<div key={i} className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-gray-900"><Image src={src} alt="Poster" fill className="object-cover" sizes="20vw" /></div>))}
               </motion.div>
            </div>
         </div>
      </div>

      {/* === 2. SMART NAVBAR (SCROLL AWARE) === */}
      <motion.div 
        // UPDATE: Logic animasi show/hide navbar
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isNavbarVisible ? "visible" : "hidden"}
        transition={{ duration: 0.35, ease: "easeInOut" }} // Smooth transition
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 sm:p-6 backdrop-blur-md bg-black/30 border-b border-white/5 shadow-lg"
      >
        <div className="h-7 w-24 sm:h-8 sm:w-28 relative cursor-pointer hover:opacity-80 transition-opacity">
          <Image src="/images/wewatch_logo_samping.png" alt="WeWatch" fill className="object-contain object-left" priority />
        </div>
        <div className="relative">
          <button onClick={() => setShowLangDropdown(!showLangDropdown)} className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md">
            <span className="text-xs font-medium text-gray-300">{language === 'id' ? 'ID' : 'EN'}</span>
            <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <AnimatePresence>
            {showLangDropdown && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-32 rounded-lg bg-[#0a0f1c] border border-white/10 shadow-xl overflow-hidden z-50">
                <button onClick={() => { setLanguage('en'); setShowLangDropdown(false); }} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5">English</button>
                <button onClick={() => { setLanguage('id'); setShowLangDropdown(false); }} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5">Indonesia</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* === 3. CENTER CONTENT === */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center items-center px-4 text-center pt-20 pb-10 sm:py-0">
        
        <motion.h1 
           className="text-4xl font-bold text-white sm:text-6xl md:text-7xl tracking-tight leading-tight" 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
           {t.title}
        </motion.h1>
        
        <motion.p 
           className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl" 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
        >
           {t.subtitle}
        </motion.p>
        
        {/* CTA Area */}
        <motion.div 
          className="mt-8 sm:mt-10 flex flex-col items-center gap-6 sm:gap-8 w-full"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
        >
           {/* Badge "Free Trial" */}
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-medium text-blue-300 tracking-wide uppercase">{t.cta_text}</span>
           </div>

           {/* Store Buttons */}
           <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto px-6 sm:px-0">
               <StoreButton href="https://play.google.com/store/apps/details?id=com.wewatch.android" subText={t.store.get} mainText="Google Play" iconPath={<svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M3.06 2.45a2.6 2.6 0 0 0-.49 1.64v15.83c0 .64.18 1.21.49 1.64l.06.06 9.23-9.25v-.23L3.12 2.39l-.06.06z"/><path fill="#34A853" d="M16.62 14.95 12.35 10.7 3.06 19.92c.42.44 1.13.5 1.82.12l11.74-6.72z"/><path fill="#FBBC05" d="M16.62 9.06 4.88 2.35c-.69-.39-1.4-.31-1.82.12l9.29 9.23 4.27-2.64z"/><path fill="#EA4335" d="M16.62 14.95 21.1 12.5c.75-.42.75-1.12 0-1.54l-4.48-2.45-4.27 2.64 4.27 2.8z"/></svg>} />
               <StoreButton href="https://apps.apple.com/id/app/wewatch-everywhere/id1533557464" subText={t.store.download} mainText="App Store" iconPath={<svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.55-.83 1.21-1.35 1.9-1.5.12 1.6-1.49 3.19-3.28 3.26-.3-1.43 1.08-2.92 1.38-1.76z"/></svg>} />
               <StoreButton href="https://appgallery.huawei.com/app/C104739437" subText={t.store.explore} mainText="AppGallery" iconPath={<svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#C7000B" d="M7.4 2h9.2c3.2 0 5.4 2.2 5.4 5.4v9.2c0 3.2-2.2 5.4-5.4 5.4H7.4C4.2 22 2 19.8 2 16.6V7.4C2 4.2 4.2 2 7.4 2z"/><path fill="#FFF" d="M16.5 13.5c0 .6-.3 1.1-.7 1.5-.4.4-1 .6-1.5.7-.6 0-1.2-.2-1.6-.5l-4.8-3.2c-.7-.5-1.1-1.2-1.1-2 0-.8.4-1.5 1.1-2l4.8-3.2c.4-.3 1-.5 1.6-.5.6 0 1.1.2 1.5.7.4.4.7.9.7 1.5v7z" opacity=".9"/><path fill="#FFF" d="M15.3 13.8c-.3.3-.7.5-1.1.5-.4 0-.8-.1-1.1-.3l-3.6-2.4c-.5-.3-.8-.9-.8-1.5 0-.6.3-1.1.8-1.5l3.6-2.4c.3-.2.7-.3 1.1-.3.4 0 .8.2 1.1.5.3.3.5.7.5 1.2v4.8c0 .5-.2.9-.5 1.2z"/></svg>} />
           </div>
        </motion.div>

      </div>

      {/* === 4. WORKFLOW STEPS === */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
        className="relative z-20 w-full border-t border-white/5 bg-black/40 backdrop-blur-md py-6"
      >
         <div className="max-w-5xl mx-auto px-6">
            {/* Steps code sama seperti sebelumnya */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-0">
               
               <div className="flex items-center gap-4 px-0 md:px-6 opacity-80 hover:opacity-100 transition-opacity group w-full md:w-auto">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex-shrink-0">1</div>
                  <div className="flex flex-col text-left">
                     <span className="text-white font-semibold text-sm">{t.steps[0].title}</span>
                     <span className="text-gray-400 text-xs">{t.steps[0].desc}</span>
                  </div>
               </div>
               <div className="hidden md:flex flex-1 items-center justify-center px-4 opacity-30"><div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div><svg className="w-4 h-4 text-white -ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>
               <div className="md:hidden text-white/10 rotate-90 self-center -my-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>

               <div className="flex items-center gap-4 px-0 md:px-6 opacity-80 hover:opacity-100 transition-opacity group w-full md:w-auto">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex-shrink-0">2</div>
                  <div className="flex flex-col text-left">
                     <span className="text-white font-semibold text-sm">{t.steps[1].title}</span>
                     <span className="text-gray-400 text-xs">{t.steps[1].desc}</span>
                  </div>
               </div>
               <div className="hidden md:flex flex-1 items-center justify-center px-4 opacity-30"><div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div><svg className="w-4 h-4 text-white -ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>
               <div className="md:hidden text-white/10 rotate-90 self-center -my-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>

               <div className="flex items-center gap-4 px-0 md:px-6 opacity-80 hover:opacity-100 transition-opacity group w-full md:w-auto">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-green-400 font-bold shadow-[0_0_15px_rgba(74,222,128,0.2)] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all flex-shrink-0">3</div>
                  <div className="flex flex-col text-left">
                     <span className="text-white font-semibold text-sm">{t.steps[2].title}</span>
                     <span className="text-gray-400 text-xs">{t.steps[2].desc}</span>
                  </div>
               </div>

            </div>
         </div>
      </motion.div>

    </section>
  );
}