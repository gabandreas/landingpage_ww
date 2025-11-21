'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, Tv, TrendingUp, ShieldCheck, ArrowRight, Mail, Briefcase, Megaphone, CheckCircle2, Globe } from 'lucide-react';

const content = {
  en: {
    hero: {
      tag: "WeWatch Business",
      title: "Premium Entertainment Solutions",
      subtitle: "Whether you are a hotel looking to upgrade in-room entertainment or a brand seeking an engaged audience, WeWatch is your partner.",
      cta: "Partner with Us"
    },
    values: [
      { 
        label: "Premium Asian Content", 
        desc: "Thousands of hours of top-tier Dramas & Movies.", 
        icon: <Tv className="w-6 h-6 text-blue-400" /> 
      },
      { 
        label: "Hospitality Ready", 
        desc: "Seamless STB integration for hotels & businesses.", 
        icon: <Building2 className="w-6 h-6 text-blue-400" /> 
      },
      { 
        label: "High Engagement", 
        desc: "Reach a dedicated audience passionate about Asian entertainment.", 
        icon: <TrendingUp className="w-6 h-6 text-blue-400" /> 
      },
      { 
        label: "Legal & Licensed", 
        desc: "100% official copyrights. Safe for your business.", 
        icon: <ShieldCheck className="w-6 h-6 text-blue-400" /> 
      }
    ],
    solutions: {
      title: "Our Solutions",
      items: [
        {
          id: "hospitality",
          title: "For Hospitality (Hotels)",
          desc: "Upgrade your guest experience. We provide Set-Top Boxes (STB) pre-loaded with WeWatch premium access.",
          icon: <Building2 className="w-8 h-8 text-white" />,
          list: ["Dedicated STB Devices", "Custom Channel List", "Bulk Subscription Rates"]
        },
        {
          id: "advertising",
          title: "For Advertisers",
          desc: "Connect your brand with a growing, tech-savvy audience. High-visibility placements without disrupting UX.",
          icon: <Megaphone className="w-8 h-8 text-white" />,
          list: ["Video Pre-roll", "In-App Banners", "Social Media Activation"]
        }
      ]
    },
    form: {
      title: "Let's Collaborate",
      subtitle: "Fill out the form and tell us which solution fits your needs.",
      name: "Full Name",
      company: "Company / Hotel Name",
      type: "Partnership Type",
      type_opts: ["Hospitality / Hotel Solution", "Advertising", "Content Distribution", "Other"],
      message: "Message",
      submit: "Contact Sales"
    }
  },
  id: {
    hero: {
      tag: "WeWatch Bisnis",
      title: "Solusi Hiburan Premium",
      subtitle: "Baik Anda pemilik hotel yang ingin meningkatkan fasilitas kamar, atau brand yang mencari audiens tepat, WeWatch adalah mitra Anda.",
      cta: "Mulai Bermitra"
    },
    values: [
      { 
        label: "Konten Asia Premium", 
        desc: "Ribuan jam Drama & Film terbaik pilihan.", 
        icon: <Tv className="w-6 h-6 text-blue-400" /> 
      },
      { 
        label: "Solusi Hotel (STB)", 
        desc: "Integrasi mudah untuk fasilitas hiburan properti Anda.", 
        icon: <Building2 className="w-6 h-6 text-blue-400" /> 
      },
      { 
        label: "Audiens Loyal", 
        desc: "Jangkau penonton yang loyal dan antusias.", 
        icon: <TrendingUp className="w-6 h-6 text-blue-400" /> 
      },
      { 
        label: "Legal & Resmi", 
        desc: "100% hak cipta resmi. Aman untuk bisnis Anda.", 
        icon: <ShieldCheck className="w-6 h-6 text-blue-400" /> 
      }
    ],
    solutions: {
      title: "Solusi Kami",
      items: [
        {
          id: "hospitality",
          title: "Untuk Hotel & Properti",
          desc: "Tingkatkan pengalaman tamu Anda. Kami menyediakan Set-Top Box (STB) siap pakai dengan akses premium WeWatch.",
          icon: <Building2 className="w-8 h-8 text-white" />,
          list: ["Perangkat STB Khusus", "Daftar Channel Kustom", "Harga Grosir / Bulk"]
        },
        {
          id: "advertising",
          title: "Untuk Pengiklan",
          desc: "Hubungkan brand Anda dengan komunitas yang terus tumbuh. Penempatan iklan strategis dengan visibilitas tinggi.",
          icon: <Megaphone className="w-8 h-8 text-white" />,
          list: ["Video Pre-roll", "Banner Aplikasi", "Aktivasi Sosial Media"]
        }
      ]
    },
    form: {
      title: "Mari Berkolaborasi",
      subtitle: "Isi formulir di bawah dan beri tahu kami solusi apa yang Anda butuhkan.",
      name: "Nama Lengkap",
      company: "Nama Perusahaan / Hotel",
      type: "Jenis Kemitraan",
      type_opts: ["Solusi Hotel / Hospitality", "Periklanan / Ads", "Distribusi Konten", "Lainnya"],
      message: "Pesan",
      submit: "Hubungi Sales"
    }
  }
};

export default function BusinessClient() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-[#040714] relative overflow-hidden text-white font-sans">
      
      {/* Static Background (Ringan) */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">

        {/* --- LANGUAGE TOGGLE (Top Right) --- */}
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

        {/* --- HERO SECTION --- */}
        {/* Menggunakan motion hanya untuk Fade In awal yang halus, tanpa pergerakan berat */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center gap-16 mb-24"
        >
          {/* Left: Copywriting */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
              <Briefcase className="w-3 h-3" /> {t.hero.tag}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors flex items-center gap-2 mx-auto lg:mx-0 shadow-lg shadow-blue-900/20">
              {t.hero.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Value Props */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {t.values.map((val, i) => (
              <div key={i} className="bg-[#0E1425] border border-white/5 p-6 rounded-2xl flex flex-col items-start hover:border-blue-500/30 transition-colors duration-300 group">
                <div className="p-3 bg-blue-500/10 rounded-lg mb-4 group-hover:bg-blue-500/20 transition-colors">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{val.label}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- SOLUTIONS SECTION --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.solutions.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.solutions.items.map((item, i) => (
              <div 
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f1c] flex flex-col hover:border-blue-500/30 transition-colors duration-300"
              >
                <div className="h-24 w-full flex items-center justify-center bg-[#0E1425] border-b border-white/5">
                   <div className="p-3 rounded-full bg-white/5 border border-white/10">
                      {item.icon}
                   </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 border-b border-white/5 pb-6">
                    {item.desc}
                  </p>
                  
                  <div className="space-y-3">
                    {item.list.map((li, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                         <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                         {li}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CONTACT FORM SECTION --- */}
        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#0a0f1c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Left Side: Info */}
            <div className="p-8 md:p-12 bg-[#0E1425] flex flex-col justify-center relative">
               <h2 className="text-3xl font-bold mb-4">{t.form.title}</h2>
               <p className="text-gray-400 mb-8 leading-relaxed">
                 {t.form.subtitle}
               </p>
             
               <div className="space-y-6">
                  <div className="flex items-start gap-4 text-sm text-gray-300">
                     <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center border border-blue-500/20 text-blue-400">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                       <p className="font-semibold hover:text-blue-400 transition-colors cursor-pointer">business@wewatch.asia</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4 text-sm text-gray-300">
                     <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center border border-blue-500/20 text-blue-400">
                        <Building2 className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Headquarters</p>
                       <p className="font-semibold leading-relaxed">Jakarta, Indonesia.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-8 md:p-12 bg-[#0a0f1c]">
               <form className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2 ml-1">{t.form.name}</label>
                    <input type="text" className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2 ml-1">{t.form.company}</label>
                        <input type="text" className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2 ml-1">{t.form.type}</label>
                        <div className="relative">
                            <select className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
                                {t.form.type_opts.map((opt, i) => <option key={i}>{opt}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                     </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2 ml-1">{t.form.message}</label>
                    <textarea rows={3} className="w-full bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                  </div>
                  
                  <button type="button" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all mt-2">
                     {t.form.submit}
                  </button>
               </form>
            </div>

        </div>

      </div>
    </main>
  );
}