'use client';

// --- PERBAIKAN IMPORT ---
import { useState } from 'react'; // useState harus dari 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Search, ChevronDown, MessageCircle, HelpCircle, Settings, CreditCard, MonitorPlay } from 'lucide-react';

// --- DATA FAQ ---
const faqData = [
  {
    id: 'gen_1',
    category: 'general',
    q: { en: "What is WeWatch?", id: "Apa itu WeWatch?" },
    a: { en: "WeWatch is a premium streaming service focused on Asian entertainment, offering thousands of hours of movies, dramas, and variety shows.", id: "WeWatch adalah layanan streaming premium yang berfokus pada hiburan Asia, menawarkan ribuan jam film, drama, dan variety show." }
  },
  {
    id: 'gen_2',
    category: 'general',
    q: { en: "Is WeWatch free to use?", id: "Apakah WeWatch gratis?" },
    a: { en: "Yes! We offer a Free tier with ads. For an ad-free experience and exclusive content, you can upgrade to Platinum or Diamond.", id: "Ya! Kami menawarkan paket Gratis dengan iklan. Untuk pengalaman tanpa iklan dan konten eksklusif, Anda bisa upgrade ke Platinum atau Diamond." }
  },
  {
    id: 'sub_1',
    category: 'account',
    q: { en: "How do I subscribe to VIP?", id: "Bagaimana cara langganan VIP?" },
    a: { en: "You can subscribe directly through our mobile app (Google Play / App Store). Simply go to 'My Account' and select 'Upgrade'.", id: "Anda bisa berlangganan langsung melalui aplikasi seluler kami (Google Play / App Store). Cukup masuk ke 'Akun Saya' dan pilih 'Upgrade'." }
  },
  {
    id: 'sub_2',
    category: 'account',
    q: { en: "Can I cancel anytime?", id: "Bisa batalkan kapan saja?" },
    a: { en: "Absolutely. There are no long-term contracts. You can cancel your subscription via your App Store settings.", id: "Tentu saja. Tidak ada kontrak jangka panjang. Anda dapat membatalkan langganan melalui pengaturan App Store Anda." }
  },
  {
    id: 'tech_1',
    category: 'technical',
    q: { en: "How to watch on my TV?", id: "Cara nonton di TV?" },
    a: { en: "If you are a Diamond subscriber, simply download the WeWatch app on your Android TV or Samsung/LG Smart TV and log in.", id: "Jika Anda pelanggan Diamond, cukup unduh aplikasi WeWatch di Android TV atau Samsung/LG Smart TV Anda dan masuk." }
  },
  {
    id: 'tech_2',
    category: 'technical',
    q: { en: "The video is buffering, what should I do?", id: "Video buffering, harus bagaimana?" },
    a: { en: "Please check your internet connection. We recommend at least 5Mbps for HD streaming. You can also try lowering the video quality in the player settings.", id: "Mohon periksa koneksi internet Anda. Kami menyarankan minimal 5Mbps untuk streaming HD. Anda juga bisa mencoba menurunkan kualitas video di pengaturan player." }
  },
  {
    id: 'tech_3',
    category: 'technical',
    q: { en: "Can I download movies for offline viewing?", id: "Bisakah download film untuk nonton offline?" },
    a: { en: "Yes, the download feature is available for Platinum and Diamond users on mobile devices.", id: "Ya, fitur download tersedia untuk pengguna Platinum dan Diamond di perangkat seluler." }
  }
];

const categories = [
  { id: 'all', label: { en: "All Questions", id: "Semua" }, icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'general', label: { en: "General", id: "Umum" }, icon: <MonitorPlay className="w-4 h-4" /> },
  { id: 'account', label: { en: "Account & Billing", id: "Akun & Tagihan" }, icon: <CreditCard className="w-4 h-4" /> },
  { id: 'technical', label: { en: "Technical", id: "Teknis" }, icon: <Settings className="w-4 h-4" /> },
];

export default function FAQPage() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  // Logic Filter: Category + Search
  const filteredData = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const qText = language === 'en' ? item.q.en.toLowerCase() : item.q.id.toLowerCase();
    const matchesSearch = qText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {language === 'en' ? "How can we help?" : "Apa yang bisa kami bantu?"}
          </h1>
          <p className="text-gray-400">
            {language === 'en' ? "Search for answers or browse topics below." : "Cari jawaban atau telusuri topik di bawah ini."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
           <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
           </div>
           <input 
             type="text" 
             placeholder={language === 'en' ? "Type a keyword (e.g., subscription, refund)..." : "Ketik kata kunci (misal: langganan, error)..."}
             className="w-full bg-[#0E1425] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.icon}
              {language === 'en' ? cat.label.en : cat.label.id}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${openQuestion === item.id ? 'bg-[#0E1425] border-blue-500/30' : 'bg-[#0a0f1c] border-white/5 hover:border-white/10'}`}
              >
                <button 
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`font-medium ${openQuestion === item.id ? 'text-blue-400' : 'text-white'}`}>
                    {language === 'en' ? item.q.en : item.q.id}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openQuestion === item.id ? 'rotate-180 text-blue-400' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openQuestion === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {language === 'en' ? item.a.en : item.a.id}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            // Empty State kalau search ga ketemu
            <div className="text-center py-12">
               <p className="text-gray-500">{language === 'en' ? "No results found." : "Tidak ada hasil ditemukan."}</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center border-t border-white/10 pt-10">
           <p className="text-gray-400 mb-4">
             {language === 'en' ? "Can't find what you're looking for?" : "Tidak menemukan jawaban yang dicari?"}
           </p>
           <a 
             href="/contact" 
             className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all text-white font-medium"
           >
             <MessageCircle className="w-4 h-4" />
             {language === 'en' ? "Chat with Support" : "Chat dengan CS"}
           </a>
        </div>

      </div>
    </main>
  );
}