'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipe data bahasa
type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default awal 'en'
  const [language, setLanguageState] = useState<Language>('en');

  // 1. EFEK PERTAMA: Saat website dibuka, cek apakah ada simpanan bahasa di browser?
  useEffect(() => {
    // Cek LocalStorage
    const savedLang = localStorage.getItem('wewatch_language') as Language;
    
    // Jika ada simpanan (misal 'id'), pakai itu.
    if (savedLang === 'id' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  // 2. Fungsi ubah bahasa yang dimodifikasi
  // Saat tombol diklik -> Ubah State DAN Simpan ke Browser
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wewatch_language', lang); // Ini kuncinya agar tidak hilang
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}