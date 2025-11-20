'use client';

import { useLanguage } from '@/context/LanguageContext';

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last Updated: November 20, 2025",
    sections: [
      {
        heading: "1. Information We Collect",
        text: "We collect information to provide better services to all our users. This includes personal details (Name, Email, Phone Number) when you register, and usage data (Watch History, Device Information, IP Address) when you use our service."
      },
      {
        heading: "2. How We Use Your Data",
        text: "We use the information we collect to: Provide, maintain, and improve our services; Personalize your content recommendations; Process your subscription payments; and Communicate with you regarding updates or support."
      },
      {
        heading: "3. Data Sharing & Disclosure",
        text: "We do not sell your personal data. We may share information with trusted third-party service providers (e.g., Payment Gateways, Cloud Hosting) solely for the purpose of operating our service. We may also disclose data if required by law."
      },
      {
        heading: "4. Security",
        text: "We work hard to protect WeWatch and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use encryption (SSL) and secure server infrastructure."
      },
      {
        heading: "5. Your Rights",
        text: "You have the right to access, correct, or delete your personal information. You can manage your account settings directly in the app or contact our support team for assistance."
      }
    ]
  },
  id: {
    title: "Kebijakan Privasi",
    updated: "Terakhir Diperbarui: 20 November 2025",
    sections: [
      {
        heading: "1. Informasi yang Kami Kumpulkan",
        text: "Kami mengumpulkan informasi untuk memberikan layanan yang lebih baik. Ini mencakup data pribadi (Nama, Email, Nomor HP) saat Anda mendaftar, dan data penggunaan (Riwayat Tontonan, Informasi Perangkat, Alamat IP) saat Anda menggunakan layanan kami."
      },
      {
        heading: "2. Cara Kami Menggunakan Data",
        text: "Kami menggunakan informasi tersebut untuk: Menyediakan, memelihara, dan meningkatkan layanan; Mempersonalisasi rekomendasi konten Anda; Memproses pembayaran langganan; dan Berkomunikasi dengan Anda terkait pembaruan atau bantuan."
      },
      {
        heading: "3. Pembagian & Pengungkapan Data",
        text: "Kami tidak menjual data pribadi Anda. Kami dapat membagikan informasi dengan penyedia layanan pihak ketiga tepercaya (misal: Payment Gateway, Cloud Hosting) semata-mata untuk tujuan operasional layanan. Kami juga dapat mengungkapkan data jika diwajibkan oleh hukum."
      },
      {
        heading: "4. Keamanan",
        text: "Kami bekerja keras untuk melindungi WeWatch dan pengguna kami dari akses tidak sah, perubahan, pengungkapan, atau perusakan informasi. Kami menggunakan enkripsi (SSL) dan infrastruktur server yang aman."
      },
      {
        heading: "5. Hak Anda",
        text: "Anda memiliki hak untuk mengakses, mengoreksi, atau menghapus informasi pribadi Anda. Anda dapat mengelola pengaturan akun langsung di aplikasi atau menghubungi tim support kami."
      }
    ]
  }
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-500 text-sm uppercase tracking-wider">{t.updated}</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-300 leading-relaxed">
           {t.sections.map((section, index) => (
             <div key={index}>
               <h2 className="text-xl font-bold text-white mb-3">{section.heading}</h2>
               <p className="text-sm md:text-base text-gray-400">{section.text}</p>
             </div>
           ))}
           
           {/* Contact Info for Privacy */}
           <div className="bg-[#0E1425] p-6 rounded-xl border border-white/5 mt-12">
              <p className="text-sm text-gray-400">
                {language === 'en' ? "Questions about this policy? Contact us at " : "Punya pertanyaan tentang kebijakan ini? Hubungi kami di "}
                <a href="mailto:privacy@wewatch.asia" className="text-blue-400 hover:underline">privacy@wewatch.asia</a>
              </p>
           </div>
        </div>

      </div>
    </main>
  );
}