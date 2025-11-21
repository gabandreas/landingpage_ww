'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Printer, Download, ChevronRight, Scale, FileText } from 'lucide-react';

// --- DATA KONTEN DENGAN ID ---
const content = {
  en: {
    title: "Terms of Use",
    updated: "Last Updated: November 20, 2025",
    intro: "Welcome to WeWatch. These Terms of Use govern your use of our service. By accessing our platform, you agree to these terms, so please read them carefully.",
    sections: [
      {
        id: "acceptance",
        heading: "1. Acceptance of Terms",
        text: "By creating an account or using WeWatch, you agree to be bound by these Terms. If you do not agree, please do not use our services. WeWatch provides a personalized subscription service that allows our members to access movies and TV shows streamed over the Internet to certain Internet-connected TV, computers and other devices."
      },
      {
        id: "usage",
        heading: "2. Use of Service",
        text: "WeWatch grants you a limited, non-exclusive, non-transferable license to access and view the content. You agree not to archive, reproduce, distribute, modify, display, perform, publish, license, create derivative works from, offer for sale, or use content and information contained on or obtained from WeWatch. You agree to use the WeWatch service, including all features and functionalities associated therewith, in accordance with all applicable laws, rules and regulations."
      },
      {
        id: "billing",
        heading: "3. Subscription & Billing",
        text: "Your WeWatch subscription will continue until terminated. Unless you cancel your subscription before your billing date, you authorize us to charge the membership fee for the next billing cycle to your Payment Method. To use the WeWatch service you must provide one or more Payment Methods. You remain responsible for any uncollected amounts."
      },
      {
        id: "security",
        heading: "4. Account Security",
        text: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. If you suspect any unauthorized use of your account, you must notify us immediately. WeWatch will not be liable for any loss or damage arising from your failure to comply with this section."
      },
      {
        id: "content",
        heading: "5. Content Availability",
        text: "The quality of the display of the streaming content may vary from device to device, and may be affected by a variety of factors, such as your location and the speed of your internet connection. Content availability may also vary by geographic location and will change from time to time."
      },
      {
        id: "termination",
        heading: "6. Termination",
        text: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability."
      }
    ]
  },
  id: {
    title: "Syarat Penggunaan",
    updated: "Terakhir Diperbarui: 20 November 2025",
    intro: "Selamat datang di WeWatch. Syarat Penggunaan ini mengatur penggunaan layanan kami oleh Anda. Dengan mengakses platform kami, Anda menyetujui persyaratan ini, jadi mohon baca dengan cermat.",
    sections: [
      {
        id: "acceptance",
        heading: "1. Penerimaan Syarat",
        text: "Dengan membuat akun atau menggunakan WeWatch, Anda setuju untuk terikat oleh Syarat ini. Jika Anda tidak setuju, mohon jangan gunakan layanan kami. WeWatch menyediakan layanan berlangganan yang dipersonalisasi yang memungkinkan anggota kami mengakses film dan acara TV yang dialirkan melalui Internet ke TV, komputer, dan perangkat lain yang terhubung ke Internet."
      },
      {
        id: "usage",
        heading: "2. Penggunaan Layanan",
        text: "WeWatch memberi Anda lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk mengakses dan menonton konten. Anda setuju untuk tidak mengarsipkan, mereproduksi, mendistribusikan, memodifikasi, menampilkan, menerbitkan, melisensikan, membuat karya turunan, menawarkan untuk dijual, atau menggunakan konten yang diperoleh dari WeWatch."
      },
      {
        id: "billing",
        heading: "3. Langganan & Tagihan",
        text: "Langganan WeWatch Anda akan berlanjut hingga diakhiri. Kecuali Anda membatalkan langganan sebelum tanggal tagihan, Anda mengizinkan kami untuk menagih biaya keanggotaan untuk siklus penagihan berikutnya ke Metode Pembayaran Anda. Anda tetap bertanggung jawab atas jumlah yang tidak tertagih."
      },
      {
        id: "security",
        heading: "4. Keamanan Akun",
        text: "Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda. Anda setuju untuk menerima tanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda. Jika Anda mencurigai adanya penggunaan tidak sah atas akun Anda, Anda harus segera memberi tahu kami."
      },
      {
        id: "content",
        heading: "5. Ketersediaan Konten",
        text: "Kualitas tampilan konten streaming dapat bervariasi dari satu perangkat ke perangkat lain, dan dapat dipengaruhi oleh berbagai faktor, seperti lokasi Anda dan kecepatan koneksi internet. Ketersediaan konten juga dapat bervariasi berdasarkan lokasi geografis dan akan berubah dari waktu ke waktu."
      },
      {
        id: "termination",
        heading: "6. Penghentian",
        text: "Kami dapat menghentikan atau menangguhkan akses ke Layanan kami segera, tanpa pemberitahuan atau kewajiban sebelumnya, dengan alasan apa pun, termasuk namun tidak terbatas jika Anda melanggar Syarat ini."
      }
    ]
  }
};

export default function TermsPage() {
  const { language } = useLanguage();
  const t = content[language];
  const [activeSection, setActiveSection] = useState(t.sections[0].id);

  // --- LOGIC SCROLL SPY (Sama seperti Privacy Policy) ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = t.sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200; 

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
      const offset = 120;
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
    <main className="min-h-screen bg-[#0a0f1c] pt-28 pb-20 relative font-sans">
      
      {/* --- LEGAL HEADER --- */}
      <div className="w-full bg-[#0E1425] border-b border-white/5 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-blue-400 text-sm mb-4 font-medium">
            <Scale className="w-5 h-5" />
            <span>WeWatch Legal Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-400 text-sm">
            <p>{t.updated}</p>
            <span className="hidden md:inline w-1 h-1 bg-gray-600 rounded-full"></span>
            <div className="flex gap-4">
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
          
          {/* --- LEFT SIDEBAR: Sticky Navigation --- */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-32">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pl-4">
                  {language === 'en' ? "On this page" : "Di halaman ini"}
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

          {/* --- RIGHT CONTENT: The Document --- */}
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
                     <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <h2 className="text-2xl font-bold text-white">
                           {section.heading}
                        </h2>
                     </div>
                     <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-8 max-w-none text-justify">
                        <p>{section.text}</p>
                     </div>
                  </section>
                ))}
             </div>

             {/* Footer Contact Box (Consolidated) */}
             <div className="mt-20 p-8 rounded-2xl bg-[#0E1425] border border-white/5 text-center">
                <h4 className="text-white font-semibold mb-2">
                  {language === 'en' ? "Questions about these Terms?" : "Ada pertanyaan soal Syarat ini?"}
                </h4>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-2 font-medium"
                >
                  {language === 'en' ? "Contact Legal Team" : "Hubungi Tim Legal"} <ChevronRight className="w-4 h-4" />
                </a>
             </div>

          </div>
        </div>
      </div>
    </main>
  );
}