'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Check, X, Zap, Star, Crown, Minus } from 'lucide-react';

// --- DATA PAKET ---
const plans = [
  {
    id: 'free',
    name: 'Free',
    icon: <Zap className="w-8 h-8 text-gray-400" />,
    price: 'Rp 0',
    duration: '/ bulan',
    description: {
      en: "Basic access. Good for starters.",
      id: "Akses dasar. Cukup untuk pemula."
    },
    features: [
      { en: "Limited Movies & TV", id: "Film & TV Terbatas" },
      { en: "SD Quality (480p)", id: "Kualitas SD (480p)" },
      { en: "1 Device", id: "1 Perangkat" },
      { en: "With Ads", id: "Ada Iklan" }
    ],
    highlight: false,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: <Star className="w-8 h-8 text-blue-400" />,
    price: 'Rp 35.000',
    duration: '/ bulan',
    description: {
      en: "Most popular choice. No ads.",
      id: "Pilihan favorit. Bebas iklan."
    },
    features: [
      { en: "Full Library Access", id: "Akses Semua Pustaka" },
      { en: "Full HD (1080p)", id: "Full HD (1080p)" },
      { en: "2 Devices", id: "2 Perangkat" },
      { en: "Ad-Free", id: "Tanpa Iklan" }
    ],
    highlight: true, // Ini yang akan kita kasih glow biru weWatch
  },
  {
    id: 'diamond',
    name: 'Diamond',
    icon: <Crown className="w-8 h-8 text-yellow-500" />, // Gold dikit biar kerasa premium tapi ga norak
    price: 'Rp 69.000',
    duration: '/ bulan',
    description: {
      en: "Ultimate quality for big screens.",
      id: "Kualitas terbaik untuk TV besar."
    },
    features: [
      { en: "Everything in Platinum", id: "Semua Fitur Platinum" },
      { en: "4K Ultra HD + Dolby", id: "4K Ultra HD + Dolby" },
      { en: "4 Devices", id: "4 Perangkat" },
      { en: "Offline Download", id: "Download Offline" }
    ],
    highlight: false,
  }
];

const comparisonData = [
  { feature: { en: "Ad-Free Experience", id: "Pengalaman Bebas Iklan" }, free: false, platinum: true, diamond: true },
  { feature: { en: "Resolution", id: "Resolusi Video" }, free: "480p", platinum: "1080p", diamond: "4K + Dolby" },
  { feature: { en: "Simultaneous Screens", id: "Layar Bersamaan" }, free: "1", platinum: "2", diamond: "4" },
  { feature: { en: "Smart TV App", id: "Aplikasi Smart TV" }, free: false, platinum: true, diamond: true },
  { feature: { en: "Download Content", id: "Download Konten" }, free: false, platinum: true, diamond: true },
];

export default function SubscriptionPage() {
  const { language } = useLanguage();
  
  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS (Agar tidak boring) --- */}
      {/* Grid Pattern Halus */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>
      
      {/* Blue Glow Ambient di atas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {language === 'en' ? "Simple, Transparent Plans" : "Pilihan Paket Simpel & Transparan"}
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? "Choose the perfect plan for your viewing habits. No hidden fees." 
              : "Pilih paket yang pas dengan kebiasaan nontonmu. Tanpa biaya tersembunyi."}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // CARD STYLING:
              // - Jika highlight: Border Biru, Background agak terang dikit
              // - Jika biasa: Border transparan, Background gelap
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight 
                  ? 'bg-[#0E1425] border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.1)] z-10 scale-105 md:scale-110' 
                  : 'bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0E1425] opacity-90 hover:opacity-100'
              }`}
            >
               {/* Recommended Badge */}
               {plan.highlight && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg tracking-widest uppercase border border-blue-400">
                   {language === 'en' ? "Recommended" : "Rekomendasi"}
                 </div>
               )}

               {/* Icon & Title */}
               <div className="flex flex-col items-center text-center mb-6 border-b border-white/5 pb-6">
                 <div className={`p-3 rounded-xl mb-4 ${plan.highlight ? 'bg-blue-500/10' : 'bg-white/5'}`}>
                    {plan.icon}
                 </div>
                 <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                 <p className="text-sm text-gray-500 mt-2">{language === 'en' ? plan.description.en : plan.description.id}</p>
               </div>

               {/* Price */}
               <div className="text-center mb-8">
                 <div className="flex items-baseline justify-center gap-1">
                   <span className="text-3xl font-bold text-white">{plan.price}</span>
                   {plan.price !== 'Rp 0' && <span className="text-sm text-gray-500">{plan.duration}</span>}
                 </div>
               </div>

               {/* Feature List */}
               <ul className="space-y-4">
                 {plan.features.map((feat, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                     <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-blue-400' : 'text-gray-600'}`} />
                     {language === 'en' ? feat.en : feat.id}
                   </li>
                 ))}
               </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-[#0a0f1c]/50 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden">
           <div className="p-8 border-b border-white/5 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">
                {language === 'en' ? "Compare Features" : "Bandingkan Fitur Lengkap"}
              </h3>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/[0.02]">
                       <th className="p-5 text-sm font-medium text-gray-400 pl-8 min-w-[200px]">{language === 'en' ? "Feature" : "Fitur"}</th>
                       <th className="p-5 text-sm font-bold text-white text-center min-w-[120px]">Free</th>
                       <th className="p-5 text-sm font-bold text-blue-400 text-center min-w-[120px]">Platinum</th>
                       <th className="p-5 text-sm font-bold text-yellow-500 text-center min-w-[120px]">Diamond</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {comparisonData.map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                         <td className="p-5 text-sm text-gray-300 pl-8">{language === 'en' ? row.feature.en : row.feature.id}</td>
                         
                         {/* Free Column */}
                         <td className="p-5 text-center">
                            {typeof row.free === 'boolean' ? (
                               row.free ? <Check className="w-5 h-5 text-white mx-auto" /> : <Minus className="w-5 h-5 text-gray-700 mx-auto" />
                            ) : <span className="text-sm text-gray-400">{row.free}</span>}
                         </td>

                         {/* Platinum Column */}
                         <td className="p-5 text-center bg-blue-500/[0.02]">
                            {typeof row.platinum === 'boolean' ? (
                               row.platinum ? <Check className="w-5 h-5 text-blue-400 mx-auto" /> : <Minus className="w-5 h-5 text-gray-700 mx-auto" />
                            ) : <span className="text-sm text-white font-medium">{row.platinum}</span>}
                         </td>

                         {/* Diamond Column */}
                         <td className="p-5 text-center">
                            {typeof row.diamond === 'boolean' ? (
                               row.diamond ? <Check className="w-5 h-5 text-yellow-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-700 mx-auto" />
                            ) : <span className="text-sm text-white font-medium">{row.diamond}</span>}
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
      
      {/* SVG Grid Pattern Definition (Optional, bisa pakai image atau css gradient) */}
      <style jsx global>{`
        .bg-grid-white {
           background-size: 40px 40px;
           background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </main>
  );
}