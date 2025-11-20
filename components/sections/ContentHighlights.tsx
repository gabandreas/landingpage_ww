'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Tipe data category
type CategoryKey = 'trending' | 'new' | 'action' | 'scifi' | 'drama' | 'adventure' | 'comedy' | 'thriller' | 'family' | 'fantasy';

// Tambahkan properti 'logo' (opsional) untuk path logo channel
const movies = [
  { title: "Karate Kid:Legends", image: "/images/karate_kid.jpg", video: "/videos/karate_kid.mp4", category: "action" as CategoryKey, logo: "/images/axn.png" },
  { title: "Buddy Daddies", image: "/images/buddy_daddies.jpg", video: "/videos/buddy_daddies.mp4", category: "anime" as CategoryKey, logo: "/images/Animax.png" },
  { title: "Godzilla Minus One", image: "/images/godzilla.jpg", video: "/videos/godzilla.mp4", category: "adventure" as CategoryKey, logo: "/images/axn.png" },
  { title: "Captain Phillips", image: "/images/captain_phillips.jpg", video: "/videos/captain_phillips.mp4", category: "action" as CategoryKey, logo: "/images/rock_action.png" }, 
  { title: "Bullet Train", image: "/images/bullet_train.jpg", video: "/videos/bullet_train.mp4", category: "action" as CategoryKey, logo: "/images/axn.png" },
  { title: "Black Clover", image: "/images/black_clover.jpg", video: "/videos/black_clover.mp4", category: "anime" as CategoryKey, logo: "/images/Animax.png" },
  { title: "What To Expect When You're Expecting", image: "/images/what.jpg", video: "/videos/what.mp4", category: "comedy" as CategoryKey, logo: "/images/rock_entertainment.png" },
  { title: "Twisted Metal", image: "/images/twisted_metal.jpg", video: "/videos/twisted_metal.mp4", category: "thriller" as CategoryKey, logo: "/images/axn.png" },
  { title: "The Wrong Daughter", image: "/images/the_wrong_daughter.jpg", video: "/videos/the_wrong_daughter.mp4", category: "horror" as CategoryKey, logo: "/images/rock_entertainment.png" },
  { title: "Hotel Translyvania", image: "/images/hotel_transylvania.jpg", video: "/videos/hotel_translyvania.mp4", category: "fantasy" as CategoryKey, logo: "/images/rock_action.png" },
];

const content = {
  en: {
    tagline: "OUR CONTENT UNIVERSE",
    title: "Premium Live TV, Movies, and Short Dramas.",
    description: "Stream top channels like AXN and Rock Entertainment in real-time. Dive into a vast VOD library and binge-worthy short dramas anytime.",
    categories: {
      trending: "Trending Now", new: "New Release", action: "Action", scifi: "Sci-Fi", drama: "Drama", adventure: "Adventure", comedy: "Comedy", thriller: "Thriller", family: "Family", fantasy: "Fantasy"
    }
  },
  id: {
    tagline: "SEMESTA KONTEN KAMI",
    title: "TV Langsung Premium, Film, dan Drama Pendek.",
    description: "Tonton saluran top seperti AXN dan Rock Entertainment secara real-time. Nikmati pustaka VOD yang luas dan drama pendek seru kapan saja.",
    categories: {
      trending: "Sedang Tren", new: "Rilis Baru", action: "Aksi", scifi: "Fiksi Ilmiah", drama: "Drama", adventure: "Petualangan", comedy: "Komedi", thriller: "Thriller", family: "Keluarga", fantasy: "Fantasi"
    }
  }
};

export function ContentHighlights() {
  const { language } = useLanguage();
  const t = content[language];

  const [hoveredMovieIndex, setHoveredMovieIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoOpen = (videoPath: string) => {
    setActiveVideo(videoPath);
  };

  return (
    <section
      id="content"
      className="w-full bg-[#040714] px-4 sm:px-6 py-16 lg:py-24"
      aria-label="Content Highlights"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 flex flex-col gap-2 sm:gap-3 text-center md:text-left"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-blue-400">
            {t.tagline}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-400 mx-auto md:mx-0">
            {t.description}
          </p>
        </motion.div>

        {/* Grid Layout Film */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {movies.map((movie, index) => {
            const isHovered = hoveredMovieIndex === index;
            const categoryName = t.categories[movie.category];

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="relative aspect-[2/3] group rounded-lg sm:rounded-xl overflow-hidden bg-[#0a0f1c] border border-white/10 cursor-pointer shadow-lg"
                onMouseEnter={() => !isMobile && setHoveredMovieIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredMovieIndex(null)}
                onClick={() => handleVideoOpen(movie.video)}
              >
                {/* Logo Channel (AXN, dll.) - Hanya muncul jika ada movie.logo */}
                {movie.logo && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-2 left-2 sm:top-3 sm:left-3 z-30 pointer-events-none"
                  >
                    <Image 
                      src={movie.logo} 
                      alt="Channel Logo" 
                      width={40} // Ukuran logo (sesuaikan)
                      height={20} // Ukuran logo (sesuaikan)
                      className="rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ width: 'auto', height: 'auto', maxWidth: '40px', maxHeight: '20px'}} // Ensure image scales nicely
                    />
                  </motion.div>
                )}

                {/* 1. Poster Image */}
                <Image
                  src={movie.image}
                  alt={`${movie.title} Poster`}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />

                {/* 2. Video Preview (DESKTOP ONLY) */}
                {!isMobile && (
                    <AnimatePresence>
                    {isHovered && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black"
                        >
                        <video
                            src={movie.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        </motion.div>
                    )}
                    </AnimatePresence>
                )}

                {/* 3. Gradient & Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-blue-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {categoryName}
                  </p>
                  <h3 className="text-white text-xs sm:text-sm font-semibold drop-shadow-md line-clamp-2">
                    {movie.title}
                  </h3>
                </div>

                {/* Icon Play Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* === VIDEO MODAL === */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 text-white/70 hover:text-white transition-colors p-3 bg-black/50 rounded-full backdrop-blur-md"
                aria-label="Close Video"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="w-full aspect-video bg-black">
                <video 
                  ref={videoRef}
                  controls 
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  <source src={activeVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}