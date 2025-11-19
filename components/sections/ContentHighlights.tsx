'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Agar TypeScript tidak error saat indexing category, kita buat tipe datanya
type CategoryKey = 'trending' | 'new' | 'action' | 'scifi' | 'drama' | 'adventure' | 'comedy' | 'thriller' | 'family' | 'fantasy';

const movies = [
  { 
    title: "Sight Unseen", 
    image: "/images/sight_unseen.jpg", 
    video: "/videos/Sight_Unseen.mp4", // Pastikan nama file video sesuai file kamu
    category: "trending" as CategoryKey 
  },
  { 
    title: "Wicked", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "new" as CategoryKey 
  },
  { 
    title: "Movie 3", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "action" as CategoryKey 
  },
  { 
    title: "Movie 4", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "scifi" as CategoryKey 
  },
  { 
    title: "Movie 5", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "drama" as CategoryKey 
  },
  { 
    title: "Movie 6", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "adventure" as CategoryKey 
  },
  { 
    title: "Movie 7", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "comedy" as CategoryKey 
  },
  { 
    title: "Movie 8", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "thriller" as CategoryKey 
  },
  { 
    title: "Movie 9", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "family" as CategoryKey 
  },
  { 
    title: "Movie 10", 
    image: "/images/wicked.jpg", 
    video: "/videos/wicked.mp4",
    category: "fantasy" as CategoryKey 
  },
];

// 3. Kamus Bahasa
const content = {
  en: {
    tagline: "What You Can Watch", // <--- JANGAN DI COMMENT
    title: "Originals, films, and events.",
    description: "Explore our vast library. Hover over any poster to preview the content instantly.",
    categories: {
      trending: "Trending Now",
      new: "New Release",
      action: "Action",
      scifi: "Sci-Fi",
      drama: "Drama",
      adventure: "Adventure",
      comedy: "Comedy",
      thriller: "Thriller",
      family: "Family",
      fantasy: "Fantasy"
    }
  },
  id: {
    tagline: "Tontonan Pilihan", // <--- JANGAN DI COMMENT
    title: "Film asli, bioskop, dan acara.",
    description: "Jelajahi pustaka luas kami. Arahkan kursor ke poster mana pun untuk melihat cuplikan instan.",
    categories: {
      trending: "Sedang Tren",
      new: "Rilis Baru",
      action: "Aksi",
      scifi: "Fiksi Ilmiah",
      drama: "Drama",
      adventure: "Petualangan",
      comedy: "Komedi",
      thriller: "Thriller",
      family: "Keluarga",
      fantasy: "Fantasi"
    }
  }
};

export function ContentHighlights() {
  // 4. Panggil Hook Bahasa
  const { language } = useLanguage();
  const t = content[language];

  const [hoveredMovieIndex, setHoveredMovieIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoOpen = (videoPath: string) => {
    setActiveVideo(videoPath);
  };

  return (
    <section
      id="content"
      className="w-full bg-[#040714] px-6 py-20 lg:py-24"
      aria-label="Content Highlights"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col gap-3 text-center md:text-left"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-blue-400">
            {t.tagline}
          </p>
          {/* SEO: h2 untuk judul section */}
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="max-w-2xl text-gray-400 md:text-lg">
            {t.description}
          </p>
        </motion.div>

        {/* Grid Layout Film */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => {
            const isHovered = hoveredMovieIndex === index;
            // Ambil nama kategori yang sudah ditranslate dengan aman
            const categoryName = t.categories[movie.category];

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="relative aspect-[2/3] group rounded-xl overflow-hidden bg-[#0a0f1c] border border-white/10 cursor-pointer shadow-lg"
                onMouseEnter={() => setHoveredMovieIndex(index)}
                onMouseLeave={() => setHoveredMovieIndex(null)}
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
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                />

                {/* 2. Video Preview */}
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

                {/* 3. Gradient & Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {categoryName}
                  </p>
                  {/* SEO: h3 untuk judul film */}
                  <h3 className="text-white text-sm font-semibold drop-shadow-md">
                    {movie.title}
                  </h3>
                </div>

                {/* Icon Play Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
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
                className="absolute top-4 right-4 z-50 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full backdrop-blur-md"
                aria-label="Close Video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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