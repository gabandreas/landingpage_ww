'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Printer, Download, ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Data konten diperbarui dengan ID untuk navigasi jangkar (anchor link)
const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last Updated: November 20, 2025",
    intro: "WeWatch is committed to protecting your privacy. This policy outlines our practices regarding the collection, use, and disclosure of your information.",
    sections: [
      {
        id: "info-collect",
        heading: "1. Information We Collect",
        text: "We collect information to provide better services to all our users. This includes personal details (Name, Email, Phone Number) when you register, and usage data (Watch History, Device Information, IP Address) when you use our service. We also collect technical data such as cookie data, device IDs, and network information to ensure service stability."
      },
      {
        id: "data-use",
        heading: "2. How We Use Your Data",
        text: "We use the information we collect to: Provide, maintain, and improve our services; Personalize your content recommendations; Process your subscription payments; and Communicate with you regarding updates or support. We may also use aggregated, non-identifiable data for market analysis to acquire new content licenses."
      },
      {
        id: "sharing",
        heading: "3. Data Sharing & Disclosure",
        text: "We do not sell your personal data. We may share information with trusted third-party service providers (e.g., Payment Gateways like Xendit/Stripe, Cloud Hosting like AWS) solely for the purpose of operating our service. We may also disclose data if required by law or to protect the rights and safety of WeWatch and its users."
      },
      {
        id: "security",
        heading: "4. Security Measures",
        text: "We work hard to protect WeWatch and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use encryption (SSL), secure server infrastructure, and strict access controls for our internal team."
      },
      {
        id: "rights",
        heading: "5. Your Rights & Choices",
        text: "You have the right to access, correct, or delete your personal information. You can manage your account settings directly in the app. You also have the right to opt-out of marketing newsletters at any time via the 'Unsubscribe' link in our emails."
      },
      {
        id: "cookies",
        heading: "6. Cookies & Tracking",
        text: "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
      }
    ]
  },
  id: {
    title: "Kebijakan Privasi",
    updated: "Terakhir Diperbarui: 20 November 2025",
    intro: "WeWatch berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan praktik kami mengenai pengumpulan, penggunaan, dan pengungkapan informasi Anda.",
    sections: [
      {
        id: "info-collect",
        heading: "1. Informasi yang Kami Kumpulkan",
        text: "Kami mengumpulkan informasi untuk memberikan layanan yang lebih baik. Ini mencakup data pribadi (Nama, Email, Nomor HP) saat Anda mendaftar, dan data penggunaan (Riwayat Tontonan, Informasi Perangkat, Alamat IP) saat Anda menggunakan layanan kami. Kami juga mengumpulkan data teknis seperti data cookie dan ID perangkat untuk memastikan stabilitas layanan."
      },
      {
        id: "data-use",
        heading: "2. Cara Kami Menggunakan Data",
        text: "Kami menggunakan informasi tersebut untuk: Menyediakan, memelihara, dan meningkatkan layanan; Mempersonalisasi rekomendasi konten Anda; Memproses pembayaran langganan; dan Berkomunikasi dengan Anda terkait pembaruan atau bantuan. Kami juga dapat menggunakan data agregat non-identifikasi untuk analisis pasar."
      },
      {
        id: "sharing",
        heading: "3. Pembagian & Pengungkapan Data",
        text: "Kami tidak menjual data pribadi Anda. Kami dapat membagikan informasi dengan penyedia layanan pihak ketiga tepercaya (misal: Payment Gateway, Cloud Hosting) semata-mata untuk tujuan operasional layanan. Kami juga dapat mengungkapkan data jika diwajibkan oleh hukum."
      },
      {
        id: "security",
        heading: "4. Langkah Keamanan",
        text: "Kami bekerja keras untuk melindungi WeWatch dan pengguna kami dari akses tidak sah, perubahan, pengungkapan, atau perusakan informasi. Kami menggunakan enkripsi (SSL), infrastruktur server yang aman, dan kontrol akses ketat untuk tim internal kami."
      },
      {
        id: "rights",
        heading: "5. Pilihan & Hak Anda",
        text: "Anda memiliki hak untuk mengakses, mengoreksi, atau menghapus informasi pribadi Anda. Anda dapat mengelola pengaturan akun langsung di aplikasi. Anda juga berhak menolak newsletter pemasaran kapan saja."
      },
      {
        id: "cookies",
        heading: "6. Cookies & Pelacakan",
        text: "Kami menggunakan cookie dan teknologi pelacakan serupa untuk melacak aktivitas di Layanan kami dan menyimpan informasi tertentu. Anda dapat menginstruksikan browser Anda untuk menolak semua cookie."
      }
    ]
  }
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = content[language];
  const [activeSection, setActiveSection] = useState(t.sections[0].id);

  // Logic sederhana untuk mendeteksi section mana yang sedang dibaca user (ScrollSpy)
  useEffect(() => {
    const handleScroll = () => {
      const sections = t.sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200; // Offset dikit

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Biar ga ketutup header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f1c] pt-28 pb-20 relative">
      
      {/* Header Section yang Clean & Corporate */}
      <div className="w-full bg-[#0E1425] border-b border-white/5 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-blue-400 text-sm mb-4 font-medium">
            <ShieldCheck className="w-5 h-5" />
            <span>WeWatch Legal Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-400 text-sm">
            <p>{t.updated}</p>
            <span className="hidden md:inline w-1 h-1 bg-gray-600 rounded-full"></span>
            <div className="flex gap-4">
               {/* Action Buttons (Dummy) biar keliatan pro */}
               <button onClick={() => window.print()} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <Printer className="w-4 h-4" /> Print
               </button>
               <button className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <Download className="w-4 h-4" /> PDF
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDEBAR: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-32">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pl-4">
                  {language === 'en' ? "Table of Contents" : "Daftar Isi"}
                </h3>
                <nav className="space-y-1 border-l border-white/10">
                   {t.sections.map((section) => (
                     <button
                       key={section.id}
                       onClick={() => scrollToSection(section.id)}
                       className={`w-full text-left py-2 pl-4 text-sm transition-all border-l-2 -ml-[1px] ${
                         activeSection === section.id 
                         ? 'text-blue-400 border-blue-400 font-medium bg-blue-400/5' 
                         : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                       }`}
                     >
                       {section.heading}
                     </button>
                   ))}
                </nav>
             </div>
          </aside>

          {/* RIGHT CONTENT: The Document */}
          <div className="lg:col-span-8 lg:col-start-5">
             
             {/* Intro Paragraph */}
             <div className="mb-10 text-gray-300 leading-relaxed text-lg">
                {t.intro}
             </div>

             <div className="w-full h-px bg-white/10 mb-10"></div>

             {/* Sections */}
             <div className="space-y-16">
                {t.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-32">
                     <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                       {section.heading}
                     </h2>
                     <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-8 max-w-none">
                        <p>{section.text}</p>
                     </div>
                  </section>
                ))}
             </div>

             {/* Footer Contact Box */}
             <div className="mt-20 p-8 rounded-2xl bg-[#0E1425] border border-white/5 text-center">
                <h4 className="text-white font-semibold mb-2">
                  {language === 'en' ? "Still have questions?" : "Masih ada pertanyaan?"}
                </h4>
                <p className="text-gray-400 text-sm mb-6">
                  {language === 'en' ? "Our Data Protection Officer is here to help." : "Data Protection Officer kami siap membantu."}
                </p>
                <a 
                  href="mailto:privacy@wewatch.asia" 
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                  Contact Privacy Team <ChevronRight className="w-4 h-4" />
                </a>
             </div>

          </div>
        </div>
      </div>
    </main>
  );
}