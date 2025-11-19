'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// 1. Pisahkan Ikon (Update: Responsive Classes di dalam SVG)
const deviceIcons: ReactNode[] = [
  // Icon 1: TV
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 sm:h-16 sm:w-16 text-white/80" stroke="currentColor" strokeWidth="1">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8" strokeLinecap="round" />
      <path d="M12 17v4" strokeLinecap="round" />
    </svg>
  ),
  // Icon 2: Computer
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 sm:h-16 sm:w-16 text-white/80" stroke="currentColor" strokeWidth="1">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" strokeLinecap="round" />
    </svg>
  ),
  // Icon 3: Mobile
  (
    <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 sm:h-16 sm:w-16 text-white/80" stroke="currentColor" strokeWidth="1">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M12 18h.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
];

// 2. Kamus Bahasa (Sama)
const content = {
  en: {
    title: "Compatible devices",
    categories: [
      { name: 'TV', items: ['Android TV', 'Apple TV', 'Chromecast', 'LG TV', 'Samsung'] },
      { name: 'Computer', items: ['Chrome OS', 'MacOS', 'Windows PC'] },
      { name: 'Mobile & Tablet', items: ['Android Phones & Tablets', 'iPhone and iPad'] },
    ]
  },
  id: {
    title: "Perangkat yang Kompatibel",
    categories: [
      { name: 'TV', items: ['Android TV', 'Apple TV', 'Chromecast', 'TV LG', 'Samsung'] },
      { name: 'Komputer', items: ['Chrome OS', 'MacOS', 'Windows PC'] },
      { name: 'Ponsel & Tablet', items: ['Ponsel & Tablet Android', 'iPhone dan iPad'] },
    ]
  }
};

export function CompatibleDevicesSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section
      id="devices"
      // UPDATE 1: Padding responsive (py-16 di mobile)
      className="w-full bg-[#040714] px-4 sm:px-6 py-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          // UPDATE 2: Margin bottom diperkecil di mobile
          className="mb-12 sm:mb-20 text-center"
        >
          {/* UPDATE 3: Font size judul diperkecil di mobile */}
          <h2 className="text-2xl font-bold text-white sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
        </motion.div>

        {/* Devices Grid */}
        {/* UPDATE 4: Grid 1 kolom di mobile, 3 di desktop */}
        <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-3">
          {t.categories.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Wrapper */}
              {/* UPDATE 5: Ukuran wrapper responsif */}
              <div className="mb-4 sm:mb-8 flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/5">
                {deviceIcons[index]}
              </div>

              {/* Category Title */}
              <h3 className="mb-3 sm:mb-6 text-lg sm:text-xl font-semibold text-white">
                {device.name}
              </h3>

              {/* List of Devices */}
              <ul className="space-y-2 sm:space-y-3">
                {device.items.map((item) => (
                  <li key={item} className="text-gray-400 text-sm sm:text-lg font-light leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}