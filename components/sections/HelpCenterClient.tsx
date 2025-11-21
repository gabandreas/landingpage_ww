'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Search, ChevronDown, MessageCircle, HelpCircle, Settings, CreditCard, Smartphone, Tag, Globe } from 'lucide-react';

// --- DATA KONTEN ---
const content = {
  en: {
    title: "Help Center",
    searchPlaceholder: "Search for answers (e.g., trial, payment)...",
    noResults: "No answers found.",
    tryAgain: "Try different keywords.",
    topics: [
      { id: 'getting_started', label: "Free Trial & Vouchers" },
      { id: 'subscription', label: "Plans & Payment" },
      { id: 'technical', label: "Technical & Devices" },
      { id: 'account', label: "Account Settings" },
    ],
    faqData: [
      // --- GETTING STARTED ---
      {
        id: 'start_1',
        category: 'getting_started',
        q: "How do I activate the 3-Day Free Trial?",
        a: "It's easy and requires NO credit card! 1. Download the WeWatch app. 2. Register an account. 3. Go to Menu > Redeem and enter your voucher code (if applicable) or simply claim the trial banner on the homepage."
      },
      {
        id: 'start_2',
        category: 'getting_started',
        q: "Where can I find my Voucher Code?",
        a: "Voucher codes are usually sent to your registered email or SMS after sign-up. You can also find promo codes on our official Instagram @wewatchasia."
      },
      {
        id: 'start_3',
        category: 'getting_started',
        q: "What is included in the Free Trial?",
        a: "You get FULL ACCESS to everything: All Live TV Channels (AXN, Rock Ent, etc.), 1000+ Movies, and Short Dramas. It is essentially the Platinum experience for 3 days."
      },
      // --- SUBSCRIPTION ---
      {
        id: 'sub_1',
        category: 'subscription',
        q: "How do I pay for a subscription?",
        a: "WeWatch uses your phone's native payment system (Google Play Billing or Apple App Store). You can pay using GoPay, Dana, ShopeePay, Credit Card, or Carrier Billing (Pulsa) directly within the app."
      },
      {
        id: 'sub_2',
        category: 'subscription',
        q: "What is the difference between Platinum and Diamond?",
        a: "Platinum (Rp 35k) allows 2 screens and Full HD quality. Diamond (Rp 69k) allows 4 screens, 4K Ultra HD quality, and is required if you want to watch on Smart TVs."
      },
      {
        id: 'sub_3',
        category: 'subscription',
        q: "Can I cancel my subscription anytime?",
        a: "Yes. There is no contract. You can cancel anytime via your Google Play or App Store subscription settings to stop future billing."
      },
      // --- TECHNICAL ---
      {
        id: 'tech_1',
        category: 'technical',
        q: "How to watch on Smart TV?",
        a: "First, ensure you are on the 'Diamond' plan. Then, download WeWatch on your Android TV. Open the mobile app, go to Menu > Scan QR, and scan the code on your TV to login instantly."
      },
      {
        id: 'tech_2',
        category: 'technical',
        q: "Can I download movies for offline viewing?",
        a: "Yes! Both Platinum and Diamond users can download movies and dramas to their mobile devices to watch later without internet."
      }
    ],
    footer: {
      title: "Still need help?",
      desc: "Our support team is just a click away.",
      btn: "Contact Support"
    }
  },
  id: {
    title: "Pusat Bantuan",
    searchPlaceholder: "Cari jawaban (misal: trial, cara bayar)...",
    noResults: "Jawaban tidak ditemukan.",
    tryAgain: "Coba kata kunci lain.",
    topics: [
      { id: 'getting_started', label: "Trial Gratis & Voucher" },
      { id: 'subscription', label: "Paket & Pembayaran" },
      { id: 'technical', label: "Teknis & Perangkat" },
      { id: 'account', label: "Pengaturan Akun" },
    ],
    faqData: [
      // --- GETTING STARTED ---
      {
        id: 'start_1',
        category: 'getting_started',
        q: "Bagaimana cara aktivasi 3 Hari Gratis?",
        a: "Mudah dan TANPA kartu kredit! 1. Download aplikasi WeWatch. 2. Daftar akun. 3. Masuk ke Menu > Redeem dan masukkan kode voucher (jika punya) atau cukup klaim banner trial di halaman utama."
      },
      {
        id: 'start_2',
        category: 'getting_started',
        q: "Di mana saya bisa dapat Kode Voucher?",
        a: "Kode voucher biasanya dikirim ke email atau SMS terdaftar setelah mendaftar. Anda juga bisa menemukan kode promo di Instagram resmi kami @wewatchasia."
      },
      {
        id: 'start_3',
        category: 'getting_started',
        q: "Apa saja isi paket Free Trial?",
        a: "Anda mendapatkan AKSES PENUH ke semuanya: Semua Channel Live TV (AXN, Rock Ent, dll), 1000+ Film, dan Drama Pendek. Ini setara dengan pengalaman Platinum selama 3 hari."
      },
      // --- SUBSCRIPTION ---
      {
        id: 'sub_1',
        category: 'subscription',
        q: "Bagaimana cara bayar langganan?",
        a: "WeWatch menggunakan sistem pembayaran bawaan HP (Google Play Billing atau Apple App Store). Anda bisa bayar pakai GoPay, Dana, ShopeePay, Kartu Kredit, atau Pulsa langsung di dalam aplikasi."
      },
      {
        id: 'sub_2',
        category: 'subscription',
        q: "Apa bedanya Platinum dan Diamond?",
        a: "Platinum (Rp 35rb) bisa 2 layar dan kualitas Full HD. Diamond (Rp 69rb) bisa 4 layar, kualitas 4K Ultra HD, dan wajib dipilih jika Anda ingin menonton di Smart TV."
      },
      {
        id: 'sub_3',
        category: 'subscription',
        q: "Bisakah batalkan langganan kapan saja?",
        a: "Ya. Tidak ada kontrak. Anda bisa membatalkan kapan saja melalui pengaturan langganan Google Play atau App Store untuk menghentikan tagihan berikutnya."
      },
      // --- TECHNICAL ---
      {
        id: 'tech_1',
        category: 'technical',
        q: "Cara nonton di Smart TV?",
        a: "Pertama, pastikan Anda paket 'Diamond'. Lalu, download WeWatch di Android TV Anda. Buka aplikasi di HP, masuk Menu > Scan QR, dan scan kode di TV untuk login instan."
      },
      {
        id: 'tech_2',
        category: 'technical',
        q: "Bisa download film buat nonton offline?",
        a: "Ya! Pengguna Platinum dan Diamond bisa mendownload film dan drama ke HP mereka untuk ditonton nanti tanpa internet."
      }
    ],
    footer: {
      title: "Masih butuh bantuan?",
      desc: "Tim support kami siap membantu Anda.",
      btn: "Hubungi CS"
    }
  }
};

// Icon Helper
const getIcon = (id: string) => {
  switch (id) {
    case 'getting_started': return <Tag className="w-6 h-6 text-green-400" />;
    case 'subscription': return <CreditCard className="w-6 h-6 text-blue-400" />;
    case 'technical': return <Smartphone className="w-6 h-6 text-purple-400" />;
    case 'account': return <Settings className="w-6 h-6 text-gray-400" />;
    default: return <HelpCircle className="w-6 h-6" />;
  }
};

export default function HelpCenterClient() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];
  
  const [activeCategory, setActiveCategory] = useState('getting_started'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  // Logic Filter
  const filteredData = t.faqData.filter(item => {
    const matchesCategory = searchQuery ? true : (activeCategory === 'all' || item.category === activeCategory);
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#040714] pt-28 pb-24 px-6 relative overflow-hidden font-sans">
      
      {/* Clean Background */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* --- LANGUAGE TOGGLE --- */}
        <div className="flex justify-end mb-8">
          <div className="bg-[#0E1425] border border-white/10 rounded-full p-1 flex items-center gap-1 shadow-lg">
             <div className="px-3 py-1.5 flex items-center gap-2 text-gray-400">
                <Globe className="w-3 h-3" />
             </div>
             <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  language === 'en' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-white'
                }`}
             >
                EN
             </button>
             <button 
                onClick={() => setLanguage('id')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  language === 'id' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-white'
                }`}
             >
                ID
             </button>
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <div className="text-center mb-12">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t.title}
            </h1>
            
            {/* Search Bar Besar */}
            <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#0E1425] border border-white/10 rounded-full py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </motion.div>
        </div>

        {/* 2. TOPIC CARDS (GRID) */}
        {!searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {t.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveCategory(topic.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group
                  ${activeCategory === topic.id 
                    ? 'bg-[#0E1425] border-blue-500 shadow-lg shadow-blue-900/20' 
                    : 'bg-[#0a0f1c] border-white/5 hover:bg-[#0E1425] hover:border-white/20'
                  }
                `}
              >
                <div className={`mb-3 p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform`}>
                   {getIcon(topic.id)}
                </div>
                <span className={`text-sm font-semibold ${activeCategory === topic.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                   {topic.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {/* 3. FAQ LIST */}
        <div className="space-y-4">
          {searchQuery && (
             <p className="text-sm text-gray-500 mb-4">
               {language === 'en' ? `Search results for "${searchQuery}":` : `Hasil pencarian "${searchQuery}":`}
             </p>
          )}

          <AnimatePresence>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl overflow-hidden border transition-colors duration-300 
                  ${openQuestion === item.id 
                    ? 'bg-[#0E1425] border-blue-500/50' 
                    : 'bg-[#0a0f1c] border-white/5 hover:border-white/10'
                  }`}
              >
                <button 
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className={`font-medium text-base pr-4 ${openQuestion === item.id ? 'text-blue-400' : 'text-white group-hover:text-blue-200'}`}>
                    {item.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openQuestion === item.id ? 'rotate-180 text-blue-400' : ''}`} 
                  />
                </button>
                
                {openQuestion === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-sm text-gray-400 leading-7">
                      <div className="h-px w-full bg-white/5 mb-4"></div>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-[#0a0f1c] rounded-2xl border border-white/5">
               <HelpCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
               <p className="text-gray-400 font-medium">
                 {t.noResults}
               </p>
               <p className="text-sm text-gray-600 mt-2">
                 {t.tryAgain}
               </p>
            </div>
          )}
          </AnimatePresence>
        </div>

        {/* 4. FOOTER CONTACT */}
        <div className="mt-20 text-center border-t border-white/10 pt-12">
           <h4 className="text-white font-bold mb-2">
             {t.footer.title}
           </h4>
           <p className="text-gray-400 text-sm mb-8">
             {t.footer.desc}
           </p>
           
           <a 
             href="/contact" 
             className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
           >
             <MessageCircle className="w-4 h-4" />
             {t.footer.btn}
           </a>
        </div>

      </div>
    </main>
  );
}