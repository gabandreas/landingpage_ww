'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Tipe data category
type CategoryKey = 'trending' | 'new' | 'action' | 'scifi' | 'drama' | 'adventure' | 'comedy' | 'thriller' | 'family' | 'fantasy';

const movies = [
  { title: "Sight Unseen", image: "/images/sight_unseen.jpg", video: "/videos/Sight_Unseen.mp4", category: "trending" as CategoryKey },
  { title: "Wicked", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "new" as CategoryKey },
  { title: "Movie 3", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "action" as CategoryKey },
  { title: "Movie 4", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "scifi" as CategoryKey },
  { title: "Movie 5", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "drama" as CategoryKey },
  { title: "Movie 6", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "adventure" as CategoryKey },
  { title: "Movie 7", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "comedy" as CategoryKey },
  { title: "Movie 8", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "thriller" as CategoryKey },
  { title: "Movie 9", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "family" as CategoryKey },
  { title: "Movie 10", image: "/images/wicked.jpg", video: "/videos/wicked.mp4", category: "fantasy" as CategoryKey },
];

const content = {
  en: {
    tagline: "What You Can Watch",
    title: "Originals, films, and events.",
    description: "Explore our vast library. Hover over any poster to preview the content instantly.",
    categories: {
      trending: "Trending Now", new: "New Release", action: "Action", scifi: "Sci-Fi", drama: "Drama", adventure: "Adventure", comedy: "Comedy", thriller: "Thriller", family: "Family", fantasy: "Fantasy"
    }
  },
  id: {
    tagline: "Tontonan Pilihan",
    title: "Film asli, bioskop, dan acara.",
    description: "Jelajahi pustaka luas kami. Arahkan kursor ke poster mana pun untuk melihat cuplikan instan.",
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
  
  // UPDATE 1: Deteksi Mobile agar tidak auto-play video saat scroll
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
      // UPDATE 2: Padding responsive (py-16 di mobile)
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
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 mx-auto md:mx-0">
            {t.description}
          </p>
        </motion.div>

        {/* Grid Layout Film */}
        {/* UPDATE 3: grid-cols-2 di mobile dengan gap-3 (lebih rapat) */}
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
                // UPDATE 4: Matikan logic hover di mobile
                onMouseEnter={() => !isMobile && setHoveredMovieIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredMovieIndex(null)}
                onClick={() => handleVideoOpen(movie.video)}
              >
                {/* 1. Poster Image */}
                <Image
                  src={movie.image}
                  alt={`${movie.title} Poster`}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" // Optimized sizes
                />

                {/* 2. Video Preview (DESKTOP ONLY) */}
                {/* UPDATE 5: Video preview hanya di-render jika bukan mobile */}
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
                  {/* Kategori hanya muncul saat hover di desktop, tapi bisa kita munculkan default di mobile jika mau. 
                      Disini saya biarkan logic hover group agar bersih. */}
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
              {/* UPDATE 6: Tombol close lebih besar area sentuhnya di mobile */}
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