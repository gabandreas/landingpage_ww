'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Smartphone, Download, Ticket, UserPlus, Zap, X, Globe } from 'lucide-react';

// --- DATA BAHASA (SAMA SEPERTI SEBELUMNYA) ---
const content = {
  en: {
    header: {
      title: "Simple Plans.",
      highlight: "Zero Hidden Fees.",
      subtitle: "Start with a 3-Day Free Trial. Cancel anytime."
    },
    plans: [
      {
        id: 'trial',
        name: '3-Day Free Trial',
        badge: "Free Access",
        price: 'Rp 0',
        duration: '/ 3 days',
        desc: "Experience WeWatch. No commitment.",
        features: ["Access Premium Live TV", "Watch AXN, Rock Ent, & More", "1000+ Movies & Short Dramas", "Requires Voucher Activation"],
        cta: "Download App"
      },
      {
        id: 'monthly',
        name: 'App 1 Month',
        badge: "Most Popular",
        price: 'Rp 50.000',
        duration: '/ month',
        desc: "Unlimited entertainment in your pocket.",
        features: ["Unlimited Access to Everything", "Ad-Free Experience", "Full HD Streaming", "Cancel Anytime"],
        cta: "Subscribe on App"
      },
      {
        id: 'quarterly',
        name: 'App 3 Months',
        badge: "Best Value",
        price: 'Rp 150.000',
        duration: '/ 3 months',
        desc: "Secure your entertainment for one season.",
        features: ["All Monthly Benefits", "Priority Support", "Offline Download", "Multi-Device Login"],
        cta: "Subscribe on App"
      }
    ],
    steps: {
      title: "Start Your Free Trial in 4 Steps",
      list: [
        { title: "Download", desc: "Get the app" },
        { title: "Register", desc: "Create ID" },
        { title: "Redeem", desc: "Use voucher" },
        { title: "Watch", desc: "Enjoy 3 days" }
      ]
    },
    modal: {
      title: "Get WeWatch App",
      desc: "Select your device platform to continue."
    }
  },
  id: {
    header: {
      title: "Pilihan Paket.",
      highlight: "Tanpa Biaya Tersembunyi.",
      subtitle: "Mulai dengan 3 Hari Gratis. Batalkan kapan saja."
    },
    plans: [
      {
        id: 'trial',
        name: '3 Hari Gratis',
        badge: "Akses Gratis",
        price: 'Rp 0',
        duration: '/ 3 hari',
        desc: "Coba pengalaman WeWatch tanpa komitmen.",
        features: ["Akses Live TV Premium", "Nonton AXN, Rock Ent, dll", "1000+ Film & Short Drama", "Wajib Aktivasi Voucher"],
        cta: "Download App"
      },
      {
        id: 'monthly',
        name: 'Paket 1 Bulan',
        badge: "Paling Laris",
        price: 'Rp 50.000',
        duration: '/ bulan',
        desc: "Hiburan tanpa batas dalam genggamanmu.",
        features: ["Akses Tanpa Batas Semuanya", "Nonton Fokus Tanpa Iklan", "Streaming Kualitas Full HD", "Bisa Berhenti Kapan Saja"],
        cta: "Langganan di App"
      },
      {
        id: 'quarterly',
        name: 'Paket 3 Bulan',
        badge: "Lebih Hemat",
        price: 'Rp 150.000',
        duration: '/ 3 bulan',
        desc: "Amankan tontonanmu untuk satu musim.",
        features: ["Semua Fitur Bulanan", "Support Prioritas", "Fitur Download Offline", "Login Banyak Perangkat"],
        cta: "Langganan di App"
      }
    ],
    steps: {
      title: "Mulai Gratisan dalam 4 Langkah",
      list: [
        { title: "Unduh", desc: "Install aplikasi" },
        { title: "Daftar", desc: "Buat akun" },
        { title: "Redeem", desc: "Pakai voucher" },
        { title: "Nonton", desc: "Puas 3 hari" }
      ]
    },
    modal: {
      title: "Download Aplikasi WeWatch",
      desc: "Pilih platform perangkatmu untuk melanjutkan."
    }
  }
};

const channels = ["AXN", "Rock Entertainment", "Rock Action", "Global Trekker", "GEM", "Animax"];

export default function SubscriptionClient() {
  const { language, setLanguage } = useLanguage();
  const t = content[language]; 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#040714] pt-28 pb-24 px-6 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
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

        {/* HEADER */}
        {/* Animasi ringan hanya saat mount, durasi dipercepat */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {t.header.title} <span className="text-blue-500">{t.header.highlight}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.header.subtitle}
            </p>
          </motion.div>
        </div>

        {/* CHANNEL LIST */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-20 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {channels.map((ch, i) => (
                <span key={i} className="text-sm md:text-base font-semibold text-white/80 tracking-wide">
                    {ch}
                </span>
            ))}
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-24">
          {t.plans.map((plan, i) => (
            <motion.div
              key={plan.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }} // Delay dan durasi dipercepat
              className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group
                ${plan.id === 'monthly' 
                  ? 'bg-[#0E1425] border-2 border-blue-600 shadow-2xl shadow-blue-900/20 scale-105 z-10' 
                  : 'bg-[#0f1219] border border-white/10 hover:border-white/20'
                }
              `}
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-4">
                   <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider 
                      ${plan.id === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                      {plan.badge}
                   </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                   <span className="text-3xl font-bold text-white">{plan.price}</span>
                   {plan.price !== 'Rp 0' && <span className="text-xs text-gray-500 uppercase font-medium">{plan.duration}</span>}
                </div>
                <p className="text-sm text-gray-400 mb-8 min-h-[40px] leading-relaxed">
                    {plan.desc}
                </p>
                <div className="w-full h-px bg-white/5 mb-8"></div>
                <ul className="space-y-4">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.id === 'monthly' ? 'text-blue-500' : 'text-gray-500'}`} />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white/[0.02] p-6 border-t border-white/5 hover:bg-white/[0.05] transition-colors cursor-pointer text-left w-full"
              >
                 <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white opacity-90 group-hover:opacity-100">
                    {plan.id === 'trial' ? <Download className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                    <span>{plan.cta}</span>
                 </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* STEPS */}
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-20">
            <h2 className="text-center text-2xl font-bold text-white mb-12">
                {t.steps.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -z-10"></div>
                {t.steps.list.map((step, idx) => (
                   <StepItem key={idx} number={idx + 1} title={step.title} desc={step.desc} idx={idx} />
                ))}
            </div>
        </div>
      </div>

      {/* --- DOWNLOAD MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} // Modal muncul lebih cepat
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Modal muncul lebih cepat dan smooth
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#0E1425] border border-white/10 p-8 rounded-3xl z-50 shadow-2xl"
            >
               <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                 <X className="w-5 h-5" />
               </button>

               <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-900/50">
                     <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t.modal.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {t.modal.desc}
                  </p>
               </div>

               <div className="space-y-3">
                  <StoreLink label="Google Play" href="https://play.google.com/store/apps/details?id=com.wewatch.android" />
                  <StoreLink label="App Store" href="https://apps.apple.com/id/app/wewatch-everywhere/id1533557464" />
                  <StoreLink label="AppGallery" href="https://appgallery.huawei.com/app/C104739437" />
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

// Helper Components (Sama seperti sebelumnya)
function StepItem({ number, title, desc, idx }: any) {
    const icons = [<Download key={1} className="w-5 h-5" />, <UserPlus key={2} className="w-5 h-5" />, <Ticket key={3} className="w-5 h-5" />, <Zap key={4} className="w-5 h-5" />];
    return (
        <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-[#0E1425] border border-white/10 flex items-center justify-center text-white mb-4 group-hover:border-blue-500 group-hover:text-blue-400 transition-all relative z-10 shadow-lg">
                {icons[idx]}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                   {number}
                </div>
            </div>
            <h4 className="text-base font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    )
}

function StoreLink({ href, label }: any) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 rounded-xl bg-[#0a0f1c] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all group">
            <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{label}</span>
            <Download className="w-4 h-4 ml-auto text-gray-600 group-hover:text-white" />
        </a>
    )
}