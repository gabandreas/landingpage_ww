'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
// ✅ FIX: Tambahkan 'ReactNode' di sini agar tidak error saat Build
import { useState, useEffect, useRef, MouseEvent, TouchEvent, useCallback, ReactNode } from 'react';

// --- DATA CHANNEL ---
const channels = [
  { 
    name: "AXN", 
    logo: "/images/axn.png", 
    image: "/images/axn.png", 
    linkUrl: "https://wewatch.id/live/axn", 
    streamUrl: "https://openindo.wewatch.asia/nl.m3u8?id=1137" 
  },
  { 
    name: "Rock Entertainment", 
    logo: "/images/rock_entertainmentt.png", 
    image: "/images/rock_entertainmentt.png", 
    linkUrl: "#",
    streamUrl: "https://openindo.wewatch.asia/nl.m3u8?id=1111" 
  },
  { 
    name: "Global Trekker", 
    logo: "/images/global__trekkerr.webp", 
    image: "/images/global__trekkerr.webp", 
    linkUrl: "#",
    streamUrl: "https://openindo.wewatch.asia/nl.m3u8?id=1110"
  },
  { 
    name: "Metro TV", 
    logo: "/images/metro_tv.png", 
    image: "/images/metro_tv.png", 
    linkUrl: "#",
    streamUrl: "https://openindo.wewatch.asia/nl.m3u8?id=1048"
  },
  { 
    name: "Animax", 
    logo: "/images/animaxx.png", 
    image: "/images/animaxx.png", 
    linkUrl: "#",
    streamUrl: "https://openindo.wewatch.asia/nl.m3u8?id=1008"
  },
  { 
    name: "Kompas TV", 
    logo: "/images/kompas.jpg", 
    image: "/images/kompas.jpg", 
    linkUrl: "#",
    streamUrl: "https://openindo.wewatch.asia/nl.m3u8?id=1050"
  },
];

const content = {
  en: {
    title: "Live TV Channels",
    subtitle: "Watch your favorite channels in real-time.",
    live: "LIVE",
    preview_label: "Free Preview",
    time_remaining: "Time Left",
    limit_reached_title: "Daily Preview Limit Reached",
    limit_reached_desc: "Download our app to continue watching for free without limits.",
    store: {
      get: "GET IT ON",
      download: "Download on the",
      explore: "EXPLORE IT ON"
    }
  },
  id: {
    title: "Saluran TV Langsung",
    subtitle: "Tonton saluran favorit Anda secara real-time.",
    live: "LANGSUNG",
    preview_label: "Preview Gratis",
    time_remaining: "Sisa Waktu",
    limit_reached_title: "Batas Preview Harian Habis",
    limit_reached_desc: "Unduh aplikasi kami untuk lanjut menonton gratis tanpa batas.",
    store: {
      get: "TEMUKAN DI",
      download: "Download di",
      explore: "JELAJAHI DI"
    }
  }
};

const DAILY_LIMIT_SECONDS = 60;

// --- COMPONENT PLAYER (LAZY LOADED HLS) ---
function HlsVideoPlayer({ src, onCanPlay, className }: { src: string, onCanPlay: () => void, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: any = null;

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    const initPlayer = async () => {
      // 1. Cek Native HLS (Safari/iOS) - Paling ringan
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', attemptPlay);
      } 
      // 2. Cek Support MSE (Chrome/Firefox/Edge) - Butuh Hls.js
      else if (typeof window !== 'undefined' && window.MediaSource) {
        try {
          // ✅ OPTIMASI: Dynamic Import HLS hanya saat komponen ini dipanggil
          const Hls = (await import('hls.js')).default;

          if (Hls.isSupported()) {
            hlsInstance = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
              autoStartLoad: true,
            });
            
            hlsInstance.loadSource(src);
            hlsInstance.attachMedia(video);
            
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
              attemptPlay();
            });

            hlsInstance.on(Hls.Events.ERROR, (_event: any, data: any) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    hlsInstance?.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    hlsInstance?.recoverMediaError();
                    break;
                  default:
                    hlsInstance?.destroy();
                    break;
                }
              }
            });
          }
        } catch (error) {
          console.error("Failed to load HLS library", error);
        }
      }
    };

    initPlayer();

    return () => {
      if (hlsInstance) hlsInstance.destroy();
      if (video) {
         video.removeEventListener('loadedmetadata', attemptPlay);
         video.removeAttribute('src');
         video.load();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      playsInline
      loop
      onCanPlay={onCanPlay}
    />
  );
}


// --- MAIN COMPONENT ---
export function LiveTVSection() {
  const { language } = useLanguage();
  const t = content[language];
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedChannel, setSelectedChannel] = useState<typeof channels[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState(DAILY_LIMIT_SECONDS);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef<number | null>(null);
  const hasMoved = useRef(false);
  
  // ✅ OPTIMASI: State untuk mengecek apakah section terlihat di layar
  const [isInView, setIsInView] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const infiniteChannels = [...channels, ...channels, ...channels, ...channels];

  // ✅ OPTIMASI: Observer untuk pause animasi jika tidak di viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger saat 10% section terlihat
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto Scroll Logic (Hanya jalan jika visible)
  useEffect(() => {
    // Jika tidak terlihat di layar, jangan jalankan requestAnimationFrame (Hemat CPU)
    if (!isInView) return;

    const scroll = () => {
      if (scrollContainerRef.current && isAutoScrolling && !isDown && !selectedChannel) {
        scrollContainerRef.current.scrollLeft += 0.8; 
        if (scrollContainerRef.current.scrollLeft >= (scrollContainerRef.current.scrollWidth / 2)) {
           scrollContainerRef.current.scrollLeft = 0;
        }
      }
      autoScrollRef.current = requestAnimationFrame(scroll);
    };
    
    autoScrollRef.current = requestAnimationFrame(scroll);
    
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [isAutoScrolling, isDown, selectedChannel, isInView]); // Tambahkan isInView dependency

  // Hover Logic
  const handleMouseEnterCard = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
      setIsVideoLoading(true);
    }, 300); 
  };

  const handleMouseLeaveCard = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredIndex(null);
    setIsVideoLoading(false);
  };

  // Drag Handlers
  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsDown(true);
    setIsAutoScrolling(false);
    hasMoved.current = false;
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    hasMoved.current = true;
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; 
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDown, startX, scrollLeft]);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDown(false);
    setIsAutoScrolling(true);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setIsDown(true);
    setIsAutoScrolling(false);
    hasMoved.current = false;
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDown) return;
    hasMoved.current = true;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; 
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDown, startX, scrollLeft]);

  // Modal Logic
  const handleCardClick = (channel: typeof channels[0]) => {
    if (hasMoved.current) return;
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('ww_daily_date');
    const storedSeconds = parseInt(localStorage.getItem('ww_daily_seconds') || '0');

    if (storedDate !== today) {
      localStorage.setItem('ww_daily_date', today);
      localStorage.setItem('ww_daily_seconds', '0');
      setTimeLeft(DAILY_LIMIT_SECONDS);
      setIsLimitReached(false);
    } else {
      const remaining = DAILY_LIMIT_SECONDS - storedSeconds;
      if (remaining <= 0) {
        setTimeLeft(0);
        setIsLimitReached(true);
      } else {
        setTimeLeft(remaining);
        setIsLimitReached(false);
      }
    }
    setSelectedChannel(channel);
    setIsAutoScrolling(false);
  };

  const handleCloseModal = () => {
    setSelectedChannel(null);
    setIsAutoScrolling(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (selectedChannel && !isLimitReached && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          const currentUsed = parseInt(localStorage.getItem('ww_daily_seconds') || '0');
          localStorage.setItem('ww_daily_seconds', (currentUsed + 1).toString());
          if (newTime <= 0) {
            setIsLimitReached(true);
            clearInterval(timerRef.current!);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedChannel, isLimitReached]);


  return (
    <section className="w-full bg-[#040714] py-12 md:py-20 border-t border-white/5 relative overflow-hidden flex flex-col gap-6 group/section">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 w-full relative z-10 flex flex-col justify-center items-center text-center mb-2 md:mb-4">
            <div className="flex items-center gap-3 mb-2 md:mb-3 justify-center">
                <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight drop-shadow-xl">{t.title}</h2>
            </div>
            <p className="text-gray-400 text-xs md:text-lg max-w-xl leading-relaxed px-4">{t.subtitle}</p>
      </div>

      {/* --- SCROLL TRACK --- */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => !isDown && setIsAutoScrolling(true)}
      >
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 md:px-6 cursor-grab active:cursor-grabbing no-scrollbar scroll-smooth will-change-scroll"
          style={{ scrollBehavior: isDown ? 'auto' : 'smooth' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
           {infiniteChannels.map((channel, i) => {
             const uniqueKey = `${channel.name}-${i}`;
             const isHovered = hoveredIndex === i;

             return (
               <div 
                 key={uniqueKey} 
                 onClick={() => handleCardClick(channel)}
                 className="relative flex-shrink-0 w-[260px] sm:w-[360px] aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden bg-[#0E1425] border border-white/5 group shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-900/30"
                 onMouseEnter={() => handleMouseEnterCard(i)}
                 onMouseLeave={handleMouseLeaveCard}
               >
                 <div className="absolute inset-0 overflow-hidden">
                    <Image 
                       src={channel.image} 
                       alt="" 
                       fill
                       quality={10}
                       sizes="(max-width: 768px) 260px, 360px"
                       className="object-cover opacity-30 blur-2xl scale-125"
                       priority={false}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />
                 </div>

                 <AnimatePresence>
                   {isHovered && (
                     <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.4 }}
                       className="absolute inset-0 bg-black z-10 hidden md:block"
                     >
                        {isVideoLoading && (
                           <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm">
                               <div className="w-6 h-6 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                           </div>
                        )}
                       <HlsVideoPlayer
                           src={channel.streamUrl}
                           className="w-full h-full object-cover opacity-90"
                           onCanPlay={() => setIsVideoLoading(false)}
                       />
                       <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none" />
                     </motion.div>
                   )}
                 </AnimatePresence>
                 
                 <div className="absolute inset-0 z-20 p-4 md:p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-start">
                        <div className="bg-red-600/90 backdrop-blur-md px-2 py-0.5 md:px-2.5 rounded md:rounded-md text-[9px] md:text-[10px] font-bold text-white tracking-widest shadow-lg flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/>
                            {t.live}
                        </div>
                    </div>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/3 transition-all duration-500 ${isHovered ? 'md:opacity-0 md:scale-90' : 'opacity-100 scale-100'}`}>
                        <Image 
                            src={channel.logo} 
                            alt={channel.name} 
                            fill 
                            sizes="(max-width: 768px) 150px, 200px"
                            className="object-contain drop-shadow-2xl" 
                        />
                    </div>
                 </div>
               </div>
             );
           })}
        </div>
     </div>

      {/* === POPUP MODAL === */}
      <AnimatePresence>
        {selectedChannel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl bg-[#0a0f1c] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
               {/* MODAL HEADER */}
               <div className="flex justify-between items-center p-3 md:p-4 bg-[#121826] border-b border-white/5">
                  <div className="flex items-center gap-3 md:gap-4">
                      <div className="relative h-6 w-16 md:h-8 md:w-24">
                          <Image src={selectedChannel.logo} alt={selectedChannel.name} fill className="object-contain object-left" />
                      </div>
                      <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
                      <p className="text-[10px] md:text-xs text-gray-400 hidden sm:block">{t.preview_label}</p>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`px-2 py-1 md:px-3 md:py-1.5 rounded-md border ${timeLeft < 10 ? 'border-red-500/50 bg-red-900/20 text-red-400' : 'border-blue-500/30 bg-blue-900/20 text-blue-400'} flex items-center gap-2`}>
                        <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 hidden sm:inline">{t.time_remaining}:</span>
                        <span className="text-sm md:text-base font-mono font-bold tabular-nums">00:{timeLeft.toString().padStart(2, '0')}</span>
                    </div>
                    <button onClick={handleCloseModal} className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
               </div>

               {/* VIDEO PLAYER AREA */}
               <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
                  {!isLimitReached ? (
                     <div className="w-full h-full">
                         <HlsVideoPlayer
                            src={selectedChannel.streamUrl}
                            className="w-full h-full object-contain"
                            onCanPlay={() => {}}
                         />
                     </div>
                  ) : (
                     <div className="absolute inset-0 z-20 bg-[#050505] flex flex-col items-center justify-center text-center p-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4 text-red-500">
                           <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h2 className="text-lg md:text-2xl font-bold text-white mb-2">{t.limit_reached_title}</h2>
                        <p className="text-gray-400 max-w-md mb-6 text-xs md:text-base">{t.limit_reached_desc}</p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-2xl mx-auto">
                          <StoreButton href="https://play.google.com/store/apps/details?id=com.wewatch.android" subText={t.store.get} mainText="Google Play" iconPath={<svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M3.06 2.45a2.6 2.6 0 0 0-.49 1.64v15.83c0 .64.18 1.21.49 1.64l.06.06 9.23-9.25v-.23L3.12 2.39l-.06.06z"/><path fill="#34A853" d="M16.62 14.95 12.35 10.7 3.06 19.92c.42.44 1.13.5 1.82.12l11.74-6.72z"/><path fill="#FBBC05" d="M16.62 9.06 4.88 2.35c-.69-.39-1.4-.31-1.82.12l9.29 9.23 4.27-2.64z"/><path fill="#EA4335" d="M16.62 14.95 21.1 12.5c.75-.42.75-1.12 0-1.54l-4.48-2.45-4.27 2.64 4.27 2.8z"/></svg>} />
                          <StoreButton href="https://apps.apple.com/id/app/wewatch-everywhere/id1533557464" subText={t.store.download} mainText="App Store" iconPath={<svg className="w-5 h-5 md:w-6 md:h-6 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.55-.83 1.21-1.35 1.9-1.5.12 1.6-1.49 3.19-3.28 3.26-.3-1.43 1.08-2.92 1.38-1.76z"/></svg>} />
                          <StoreButton href="https://appgallery.huawei.com/app/C104739437" subText={t.store.explore} mainText="AppGallery" iconPath={<svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24"><path fill="#C7000B" d="M7.4 2h9.2c3.2 0 5.4 2.2 5.4 5.4v9.2c0 3.2-2.2 5.4-5.4 5.4H7.4C4.2 22 2 19.8 2 16.6V7.4C2 4.2 4.2 2 7.4 2z"/><path fill="#FFF" d="M16.5 13.5c0 .6-.3 1.1-.7 1.5-.4.4-1 .6-1.5.7-.6 0-1.2-.2-1.6-.5l-4.8-3.2c-.7-.5-1.1-1.2-1.1-2 0-.8.4-1.5 1.1-2l4.8-3.2c.4-.3 1-.5 1.6-.5.6 0 1.1.2 1.5.7.4.4.7.9.7 1.5v7z" opacity=".9"/><path fill="#FFF" d="M15.3 13.8c-.3.3-.7.5-1.1.5-.4 0-.8-.1-1.1-.3l-3.6-2.4c-.5-.3-.8-.9-.8-1.5 0-.6.3-1.1.8-1.5l3.6-2.4c.3-.2.7-.3 1.1-.3.4 0 .8.2 1.1.5.3.3.5.7.5 1.2v4.8c0 .5-.2.9-.5 1.2z"/></svg>} />
                        </div>
                     </div>
                  )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .will-change-scroll { will-change: scroll-position; }
      `}</style>
    </section>
  );
}

// Tipe ReactNode sudah diimport di atas
interface StoreButtonProps {
  href: string;
  subText: string;
  mainText: string;
  iconPath: ReactNode;
}

function StoreButton({ href, subText, mainText, iconPath }: StoreButtonProps) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl px-4 py-2.5 transition-all hover:scale-105 group w-full sm:w-auto justify-center sm:justify-start"
    >
      <div className="flex-shrink-0 transition-transform group-hover:scale-110">
        {iconPath}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[9px] md:text-[10px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-1">{subText}</span>
        <span className="text-xs md:text-sm font-bold text-white leading-none tracking-tight">{mainText}</span>
      </div>
    </a>
  );
}