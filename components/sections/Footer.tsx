'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const content = {
  en: {
    company: "Company",
    explore: "Explore",
    support: "Support",
    connect: "Connect",
    menu: {
      about: "About Us",
      media: "Media Center",
      movies: "Movies",
      tv: "TV Shows",
      faq: "FAQ",
      devices: "Supported Devices",
    },
    copyright: "© WeWatch and its related entities. All Rights Reserved.",
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },
    store: {
      get: "Get it on",
      download: "Download on the",
      explore: "Explore it on"
    }
  },
  id: {
    company: "Perusahaan",
    explore: "Jelajahi",
    support: "Dukungan",
    connect: "Ikuti Kami",
    menu: {
      about: "Tentang Kami",
      media: "Pusat Media",
      movies: "Film",
      tv: "Acara TV",
      faq: "FAQ",
      devices: "Perangkat",
    },
    copyright: "© WeWatch dan entitas terkait. Hak Cipta Dilindungi.",
    legal: {
      privacy: "Kebijakan Privasi",
      terms: "Syarat Penggunaan",
    },
    store: {
      get: "Temukan di",
      download: "Unduh di",
      explore: "Jelajahi di"
    }
  }
};

export function Footer() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    // UPDATE 1: Padding atas dikurangi di mobile (pt-12) vs desktop (pt-16)
    <footer className="w-full bg-[#040714] border-t border-white/10 pt-12 sm:pt-16 pb-8 text-sm">
      <div className="mx-auto w-full max-w-7xl px-6">
        
        {/* Top Section: Grid Layout */}
        {/* UPDATE 2: grid-cols-2 di mobile. Ini bikin footer ga kepanjangan ke bawah */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-10 mb-12">
          
          {/* Column 1: Company */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-white font-semibold text-base">{t.company}</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors text-xs sm:text-sm">{t.menu.about}</Link></li>
              <li><Link href="/media" className="hover:text-blue-400 transition-colors text-xs sm:text-sm">{t.menu.media}</Link></li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-white font-semibold text-base">{t.explore}</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors text-xs sm:text-sm">{t.menu.movies}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors text-xs sm:text-sm">{t.menu.tv}</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-white font-semibold text-base">{t.support}</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors text-xs sm:text-sm">{t.menu.faq}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors text-xs sm:text-sm">{t.menu.devices}</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect with Us */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-white font-semibold text-base">{t.connect}</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-blue-500 transition-colors"><svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733 1.092-2.733 2.807v1.165h3.708l-.475 3.667h-3.233v7.98h-5.08z" /></svg></a>
              <a href="#" className="text-white hover:text-white transition-colors"><svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="#" className="text-white hover:text-pink-500 transition-colors"><svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
              <a href="#" className="text-white hover:text-red-600 transition-colors"><svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        {/* Bottom Section: Copyright & Store Buttons */}
        <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">
          
          {/* Left: Copyright & Simplified Legal Links */}
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <p className="text-xs text-gray-500 text-center lg:text-left">
              {t.copyright} © {new Date().getFullYear()}.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400 lg:justify-start">
              <Link href="#" className="hover:text-white transition-colors">{t.legal.privacy}</Link>
              <Link href="#" className="hover:text-white transition-colors">{t.legal.terms}</Link>
            </div>
          </div>

          {/* Right: Store Buttons */}
          {/* UPDATE 3: Flex-wrap center di mobile, end di desktop */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-3">
            {/* Google Play */}
            <a href="https://play.google.com/store/apps/details?id=com.wewatch.android&pcampaignid=web_share" className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-4 py-2 hover:bg-white/5 transition-all hover:border-white/40 group min-w-[130px] sm:min-w-[140px]">
               <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.06 2.45a2.6 2.6 0 0 0-.49 1.64v15.83c0 .64.18 1.21.49 1.64l.06.06 9.23-9.25v-.23L3.12 2.39l-.06.06z"/>
                  <path fill="#34A853" d="M16.62 14.95 12.35 10.7 3.06 19.92c.42.44 1.13.5 1.82.12l11.74-6.72z"/>
                  <path fill="#FBBC05" d="M16.62 9.06 4.88 2.35c-.69-.39-1.4-.31-1.82.12l9.29 9.23 4.27-2.64z"/>
                  <path fill="#EA4335" d="M16.62 14.95 21.1 12.5c.75-.42.75-1.12 0-1.54l-4.48-2.45-4.27 2.64 4.27 2.8z"/>
               </svg>
               <div className="text-left">
                 <div className="text-[8px] sm:text-[9px] uppercase leading-none text-gray-400">{t.store.get}</div>
                 <div className="text-[11px] sm:text-xs font-semibold text-white">Google Play</div>
               </div>
            </a>
            {/* App Store */}
            <a href="https://apps.apple.com/id/app/wewatch-everywhere/id1533557464" className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-4 py-2 hover:bg-white/5 transition-all hover:border-white/40 group min-w-[130px] sm:min-w-[140px]">
               <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white" viewBox="0 0 24 24">
                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.55-.83 1.21-1.35 1.9-1.5.12 1.6-1.49 3.19-3.28 3.26-.3-1.43 1.08-2.92 1.38-1.76z"/>
               </svg>
               <div className="text-left">
                 <div className="text-[8px] sm:text-[9px] uppercase leading-none text-gray-400">{t.store.download}</div>
                 <div className="text-[11px] sm:text-xs font-semibold text-white">App Store</div>
               </div>
            </a>
            {/* Huawei AppGallery */}
            <a href="https://appgallery.huawei.com/app/C104739437" className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-4 py-2 hover:bg-white/5 transition-all hover:border-white/40 group min-w-[130px] sm:min-w-[140px]">
               <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                  <path fill="#C7000B" d="M7.4 2h9.2c3.2 0 5.4 2.2 5.4 5.4v9.2c0 3.2-2.2 5.4-5.4 5.4H7.4C4.2 22 2 19.8 2 16.6V7.4C2 4.2 4.2 2 7.4 2z"/>
                  <path fill="#FFF" d="M16.5 13.5c0 .6-.3 1.1-.7 1.5-.4.4-1 .6-1.5.7-.6 0-1.2-.2-1.6-.5l-4.8-3.2c-.7-.5-1.1-1.2-1.1-2 0-.8.4-1.5 1.1-2l4.8-3.2c.4-.3 1-.5 1.6-.5.6 0 1.1.2 1.5.7.4.4.7.9.7 1.5v7z" opacity=".9"/>
                  <path fill="#FFF" d="M15.3 13.8c-.3.3-.7.5-1.1.5-.4 0-.8-.1-1.1-.3l-3.6-2.4c-.5-.3-.8-.9-.8-1.5 0-.6.3-1.1.8-1.5l3.6-2.4c.3-.2.7-.3 1.1-.3.4 0 .8.2 1.1.5.3.3.5.7.5 1.2v4.8c0 .5-.2.9-.5 1.2z"/>
               </svg>
               <div className="text-left">
                 <div className="text-[8px] sm:text-[9px] uppercase leading-none text-gray-400">{t.store.explore}</div>
                 <div className="text-[11px] sm:text-xs font-semibold text-white">AppGallery</div>
               </div>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}