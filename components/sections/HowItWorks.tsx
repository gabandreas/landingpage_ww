'use client';

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; 
import { MouseEvent } from 'react';

// --- Data Poster (Tetap) ---
const postersColumn1 = [
  '/images/all_my_friends.jpg', 
  '/images/love_at_first_fight.jpg',
  '/images/tojkyo_fiancee.jpg',
  '/images/mammal.jpg', 
  '/images/whats_for_dinner.jpg', 
];

const postersColumn2 = [
  '/images/the_exception.jpg', 
  '/images/king_of_devil_island.jpg', 
  '/images/happier_times.jpg', 
  '/images/joy_of.jpg', 
  '/images/italian_gigolo.jpg',
];

const postersColumn3 = [
  '/images/pure_white.jpg', 
  '/images/lalala.jpg', 
  '/images/elalamein.jpg', 
  '/images/a_tale.jpg',
  '/images/one_floor.jpg',
];

const content = {
  en: {
    badge: "Endless Discovery",
    title: "Always something new to watch.",
    description: "From timeless classics to the latest premieres. Dive into a universe of stories tailored just for you."
  },
  id: {
    badge: "Eksplorasi Tanpa Henti",
    title: "Selalu ada tontonan baru.",
    description: "Dari film klasik abadi hingga penayangan perdana terbaru. Selami semesta cerita yang disesuaikan khusus untuk Anda."
  }
};

// Komponen Poster Kecil
function PosterCard({ src }: { src: string }) {
  return (
    <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-[#0a0f1c] group cursor-pointer">
       {/* Gambar */}
       <Image 
         src={src} 
         alt="Poster" 
         fill 
         className="object-cover transition-transform duration-700 group-hover:scale-110" 
         sizes="33vw" 
         onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }} 
       />
       {/* Shine Effect */}
       <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
       {/* Border Glow halus */}
       <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-xl transition-colors duration-300 pointer-events-none" />
    </div>
  );
}

export function HowItWorks() { 
  const { language } = useLanguage();
  const t = content[language];

  // --- Logic 3D Mouse Tilt ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 15 });

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const { clientX, clientY, currentTarget } = event;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Transformasi nilai mouse ke derajat rotasi
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]); 

  // Duplikasi Array untuk Infinite Loop
  const column1 = [...postersColumn1, ...postersColumn1, ...postersColumn1, ...postersColumn1];
  const column2 = [...postersColumn2, ...postersColumn2, ...postersColumn2, ...postersColumn2];
  const column3 = [...postersColumn3, ...postersColumn3, ...postersColumn3, ...postersColumn3];

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#040714] py-24 lg:py-36 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-blob-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-blob-slow animation-delay-2000" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Teks */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium tracking-widest uppercase">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
            {t.description}
          </p>
        </motion.div>

        {/* Right Side: 3D Floating Infinite Scroll */}
        <motion.div 
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="h-[600px] md:h-[700px] relative overflow-hidden bg-[#040714]/40 rounded-3xl border border-white/5 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        > 
            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040714] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040714] to-transparent z-20 pointer-events-none" />

            {/* Grid Container - UPDATE DISINI: rotate-2 (positif) untuk miring ke arah sebaliknya */}
            <div className="grid grid-cols-3 gap-4 h-full overflow-hidden px-3 transform rotate-2 scale-105"> 
                
                {/* Column 1: Bergerak ke ATAS */}
                <div className="relative w-full h-full overflow-hidden">
                  <motion.div 
                    className="flex flex-col gap-4"
                    animate={{ y: ["0%", "-50%"] }} 
                    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                  >
                    {column1.map((src, i) => <PosterCard key={i} src={src} />)}
                  </motion.div>
                </div>

                {/* Column 2: Bergerak ke BAWAH */}
                <div className="relative w-full h-full overflow-hidden">
                  <motion.div 
                    className="flex flex-col gap-4"
                    animate={{ y: ["-50%", "0%"] }} 
                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                  >
                    {column2.map((src, i) => <PosterCard key={i} src={src} />)}
                  </motion.div>
                </div>

                {/* Column 3: Bergerak ke ATAS */}
                <div className="relative w-full h-full overflow-hidden">
                  <motion.div 
                    className="flex flex-col gap-4"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                  >
                    {column3.map((src, i) => <PosterCard key={i} src={src} />)}
                  </motion.div>
                </div>

            </div>
        </motion.div>
      </div>
    </section>
  );
}