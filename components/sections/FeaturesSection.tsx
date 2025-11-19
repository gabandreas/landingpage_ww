'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// 1. Definisi Ikon (Update: Responsive Classes h-6 sm:h-8)
const featureIcons: ReactNode[] = [
  // Icon 1: Adaptive Streaming
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-8 sm:w-8 text-white" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  // Icon 2: Live TV
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-8 sm:w-8 text-white" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  // Icon 3: VOD
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-8 sm:w-8 text-white" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  // Icon 4: Mobile Optimized
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-8 sm:w-8 text-white" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
];

// 2. Data Konten (Sama seperti sebelumnya)
const content = {
  en: {
    sectionTitle: "Designed for your viewing pleasure.",
    sectionDesc: "Everything you need for a great entertainment experience, simpler and faster.",
    features: [
      {
        title: 'Adaptive Streaming',
        description: 'Smooth playback that automatically adjusts to your internet speed. Say goodbye to buffering.',
      },
      {
        title: 'Live TV Channels',
        description: 'Watch your favorite local and international TV stations in real-time, right from your app.',
      },
      {
        title: 'Video On Demand',
        description: 'A vast library of movies, dramas, and series ready to watch whenever and wherever you want.',
      },
      {
        title: 'Mobile Optimized',
        description: 'Enjoy high-definition visuals and clear audio, perfectly optimized for your smartphone screen.',
      },
    ]
  },
  id: {
    sectionTitle: "Dirancang untuk kenyamanan menonton.",
    sectionDesc: "Segala yang Anda butuhkan untuk hiburan terbaik, lebih simpel dan cepat.",
    features: [
      {
        title: 'Streaming Lancar',
        description: 'Pemutaran video mulus yang menyesuaikan kecepatan internet Anda secara otomatis. Bebas buffering.',
      },
      {
        title: 'Saluran TV Langsung',
        description: 'Tonton stasiun TV lokal dan internasional favorit Anda secara real-time, langsung dari aplikasi.',
      },
      {
        title: 'Video On Demand',
        description: 'Pustaka lengkap berisi film, drama, dan serial yang siap ditonton kapan saja dan di mana saja.',
      },
      {
        title: 'Optimal di Ponsel',
        description: 'Nikmati visual definisi tinggi dan audio jernih, yang dimaksimalkan untuk layar smartphone Anda.',
      },
    ]
  }
};

export function FeaturesSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section
      id="features"
      // Update 1: Padding diperkecil di mobile (py-16), normal di desktop (lg:py-32)
      className="w-full bg-[#040714] px-4 sm:px-6 py-16 sm:py-24 lg:py-32"
      aria-label="Features"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          // Update 2: Margin bottom diperkecil di mobile (mb-12)
          className="mb-12 sm:mb-20 text-center"
        >
          {/* Update 3: Font size title diperkecil di mobile (text-2xl) */}
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl leading-tight">
            {t.sectionTitle}
          </h2>
          {/* Update 4: Font size desc diperkecil di mobile (text-base) */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-400 px-2">
            {t.sectionDesc}
          </p>
        </motion.div>

        {/* Features Grid */}
        {/* Update 5: Gap diperkecil di mobile (gap-8) biar ga terlalu jauh */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center text-center group px-2"
            >
              {/* Icon Circle Container */}
              {/* Update 6: Ukuran lingkaran responsif (h-16 w-16 di mobile, h-20 w-20 di desktop) */}
              <div className="mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-gray-300">
                {featureIcons[index]}
              </div>

              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}