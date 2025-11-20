'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Cast, Download, Shield, Smartphone, CreditCard, Subtitles, Lightbulb, PlayCircle, UserCog } from 'lucide-react';

// ... (BAGIAN DATA guideData SAMA SEPERTI SEBELUMNYA, TIDAK PERLU DIUBAH) ...
const guideData = {
  en: [
    {
      category: "Getting Started",
      catIcon: <PlayCircle className="w-5 h-5" />,
      items: [
        {
          title: "Login on New Device",
          desc: "Access your account securely on multiple devices.",
          icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
          steps: ["Download WeWatch app.", "Tap 'Login' (not Sign Up).", "Enter registered email/phone.", "Input the OTP sent to you."]
        },
        {
          title: "Watch Offline",
          desc: "Save content to watch without internet connection.",
          icon: <Download className="w-8 h-8 text-green-400" />,
          steps: ["Go to movie details page.", "Tap the 'Download' icon.", "Choose video quality.", "Access via 'My Downloads' tab."]
        }
      ]
    },
    {
      category: "Playback Features",
      catIcon: <Lightbulb className="w-5 h-5" />,
      items: [
        {
          title: "How to Cast to TV",
          desc: "Stream on the big screen using Chromecast/AirPlay.",
          icon: <Cast className="w-8 h-8 text-blue-400" />,
          steps: ["Connect phone to same Wi-Fi as TV.", "Play a video on the app.", "Tap 'Cast' icon (top right).", "Select your TV name."]
        },
        {
          title: "Multi-Language Subs",
          desc: "Customize audio and subtitle preferences instantly.",
          icon: <Subtitles className="w-8 h-8 text-purple-400" />,
          steps: ["Tap screen while watching.", "Select 'CC' or 'Audio' icon.", "Choose desired language.", "Settings saved for next time."]
        }
      ]
    },
    {
      category: "Account & Safety",
      catIcon: <UserCog className="w-5 h-5" />,
      items: [
        {
          title: "Parental Control",
          desc: "Protect children with PIN-based viewing restrictions.",
          icon: <Shield className="w-8 h-8 text-yellow-400" />,
          steps: ["Go to Profile > Settings.", "Select 'Parental Control'.", "Set a 4-digit security PIN.", "Choose allowed age ratings."]
        },
        {
          title: "Manage Subscription",
          desc: "Check billing dates or change your plan easily.",
          icon: <CreditCard className="w-8 h-8 text-pink-400" />,
          steps: ["Go to 'My Account'.", "Select 'Subscription Plan'.", "View renewal date/details.", "Manage via App/Play Store."]
        }
      ]
    }
  ],
  id: [
    {
      category: "Memulai",
      catIcon: <PlayCircle className="w-5 h-5" />,
      items: [
        {
          title: "Login Perangkat Baru",
          desc: "Akses akun Anda dengan aman di berbagai perangkat.",
          icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
          steps: ["Download aplikasi WeWatch.", "Pilih 'Masuk' (bukan Daftar).", "Masukkan email/HP terdaftar.", "Input kode OTP yang dikirim."]
        },
        {
          title: "Nonton Offline",
          desc: "Simpan konten untuk ditonton tanpa koneksi internet.",
          icon: <Download className="w-8 h-8 text-green-400" />,
          steps: ["Buka halaman detail film.", "Ketuk ikon 'Download'.", "Pilih kualitas video.", "Akses via tab 'Download Saya'."]
        }
      ]
    },
    {
      category: "Fitur Pemutaran",
      catIcon: <Lightbulb className="w-5 h-5" />,
      items: [
        {
          title: "Cara Cast ke TV",
          desc: "Streaming di layar besar pakai Chromecast/AirPlay.",
          icon: <Cast className="w-8 h-8 text-blue-400" />,
          steps: ["Hubungkan HP ke Wi-Fi TV.", "Putar video di aplikasi.", "Ketuk ikon 'Cast' (kanan atas).", "Pilih nama TV Anda."]
        },
        {
          title: "Subtitle & Audio",
          desc: "Sesuaikan preferensi bahasa secara instan saat nonton.",
          icon: <Subtitles className="w-8 h-8 text-purple-400" />,
          steps: ["Ketuk layar saat nonton.", "Pilih ikon 'CC' atau 'Audio'.", "Pilih bahasa yang diinginkan.", "Pengaturan tersimpan otomatis."]
        }
      ]
    },
    {
      category: "Akun & Keamanan",
      catIcon: <UserCog className="w-5 h-5" />,
      items: [
        {
          title: "Kontrol Orang Tua",
          desc: "Lindungi anak dengan batasan tontonan berbasis PIN.",
          icon: <Shield className="w-8 h-8 text-yellow-400" />,
          steps: ["Ke Profil > Pengaturan.", "Pilih 'Parental Control'.", "Atur 4 digit PIN keamanan.", "Pilih rating usia yang diizinkan."]
        },
        {
          title: "Kelola Langganan",
          desc: "Cek tanggal tagihan atau ubah paket dengan mudah.",
          icon: <CreditCard className="w-8 h-8 text-pink-400" />,
          steps: ["Buka menu 'Akun Saya'.", "Pilih 'Paket Langganan'.", "Lihat detail perpanjangan.", "Kelola via App/Play Store."]
        }
      ]
    }
  ]
};

const headerContent = {
  en: { title: "User Guide", subtitle: "Quick tutorials to master your WeWatch experience." },
  id: { title: "Panduan Pengguna", subtitle: "Tutorial singkat untuk menguasai pengalaman WeWatch Anda." }
};

export default function GuidePage() {
  const { language } = useLanguage();
  const data = guideData[language];
  const header = headerContent[language];
  const [activeTab, setActiveTab] = useState(0); 

  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 center-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {header.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {header.subtitle}
          </p>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {data.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === index 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 scale-105' 
                  : 'bg-[#0E1425] border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/50'
              }`}
            >
              {cat.catIcon}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* --- CONTENT AREA --- */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {data[activeTab].items.map((guide, i) => (
              <div
                key={i}
                className="group relative bg-[#0a0f1c] border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
              >
                 {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none"></div>

                {/* Icon & Title */}
                <div className="relative flex items-center gap-5 mb-6 border-b border-white/5 pb-6">
                  <div className="p-4 rounded-2xl bg-[#0E1425] border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                     {guide.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {guide.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {guide.desc}
                    </p>
                  </div>
                </div>

                {/* Steps List */}
                <div className="relative">
                  {/* PERBAIKAN: Ganti <p> jadi <div> atau <h4> */}
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {language === 'en' ? "Quick Steps" : "Langkah Cepat"}
                  </div>
                  
                  <ul className="space-y-4">
                    {guide.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-sm text-gray-300 group/step">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center text-xs font-bold mt-0.5 group-hover/step:border-blue-500 group-hover/step:text-blue-400 transition-colors">
                          {idx + 1}
                        </div>
                        <span className="leading-relaxed pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}