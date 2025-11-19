'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // Import Context Bahasa

// 1. Definisi Ikon (Tetap sama untuk kedua bahasa)
const featureIcons: ReactNode[] = [
  // Icon 1: Adaptive Streaming
  (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-white">
      <rect x="5" y="10" width="30" height="20" rx="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 25c2-4 10-4 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="16" r="2" fill="currentColor" />
    </svg>
  ),
  // Icon 2: Live TV
  (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-white">
      <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 31c2-5 7-8 12-8s10 3 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31 9l4 4m0-4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Icon 3: VOD
  (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-white">
      <rect x="9" y="14" width="22" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 14v-3a6 6 0 0 1 12 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  // Icon 4: Audio
  (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-white">
      <rect x="12" y="12" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16v8M32 16v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
];

// 2. Data Konten Bilingual (SEO Friendly Keywords included)
const content = {
  en: {
    sectionTitle: "Designed for premium viewing.",
    sectionDesc: "Cinematic fidelity paired with effortless controls.",
    features: [
      {
        title: 'Adaptive Streaming',
        description: 'Edge-powered delivery keeps 4K UHD steady on every device.',
      },
      {
        title: 'Live TV Streaming',
        description: 'AI-assisted discovery keeps every profile personal yet calm.',
      },
      {
        title: 'Video On Demand',
        description: 'Encrypted downloads with timed release windows and alerts.',
      },
      {
        title: 'Studio-Grade Audio',
        description: 'Dolby Vision & Atmos ready; automatic device handoff.',
      },
    ]
  },
  id: {
    sectionTitle: "Dirancang untuk pengalaman premium.",
    sectionDesc: "Kualitas sinematik dipadukan dengan kontrol yang mudah.",
    features: [
      {
        title: 'Streaming Adaptif',
        description: 'Teknologi Edge menjaga kualitas 4K UHD tetap stabil di setiap perangkat.',
      },
      {
        title: 'Streaming TV Langsung',
        description: 'Penemuan berbasis AI membuat setiap profil terasa personal dan nyaman.',
      },
      {
        title: 'Video On Demand',
        description: 'Unduhan terenkripsi dengan jadwal rilis otomatis dan notifikasi.',
      },
      {
        title: 'Audio Kualitas Studio',
        description: 'Mendukung Dolby Vision & Atmos; perpindahan perangkat otomatis.',
      },
    ]
  }
};

export function FeaturesSection() {
  const { language } = useLanguage(); // Mengambil state bahasa
  const t = content[language]; // Memilih konten berdasarkan bahasa (en/id)

  return (
    <section
      id="features"
      className="w-full bg-[#040714] px-6 py-24 lg:py-32"
      aria-label="Features" // SEO: Menambahkan label untuk aksesibilitas
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          {/* SEO: Menggunakan h2 untuk judul seksi */}
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t.sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {t.sectionDesc}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {t.features.map((feature, index) => (
            <motion.div
              key={index} // Menggunakan index karena urutan statis
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle Container */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/10">
                {featureIcons[index]}
              </div>

              {/* SEO: Menggunakan h3 untuk sub-judul fitur */}
              <h3 className="mb-3 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              {/* Description */}
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