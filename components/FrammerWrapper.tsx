'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. Import useLanguage
import { useLanguage } from '@/context/LanguageContext'; 

export default function FramerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Ambil value bahasa saat ini
  const { language } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // 3. INI KUNCINYA: Jadikan language sebagai key!
        // Saat 'en' berubah jadi 'id', React akan menganggap ini komponen baru
        // dan otomatis merender ulang seluruh isinya dengan bahasa baru.
        // key={language} 
        
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25, duration: 0.5 }} // Sedikit delay biar smooth
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}