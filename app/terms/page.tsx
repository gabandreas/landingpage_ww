'use client';

import { useLanguage } from '@/context/LanguageContext';

const content = {
  en: {
    title: "Terms of Use",
    updated: "Last Updated: November 20, 2025",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        text: "By creating an account or using WeWatch, you agree to be bound by these Terms. If you do not agree, please do not use our services."
      },
      {
        heading: "2. Use of Service",
        text: "WeWatch grants you a limited, non-exclusive, non-transferable license to access and view the content. You agree not to archive, reproduce, distribute, modify, display, perform, publish, license, create derivative works from, offer for sale, or use content and information contained on or obtained from WeWatch."
      },
      {
        heading: "3. Subscription & Billing",
        text: "Your WeWatch subscription will continue until terminated. Unless you cancel your subscription before your billing date, you authorize us to charge the membership fee for the next billing cycle to your Payment Method."
      },
      {
        heading: "4. Account Security",
        text: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
      },
      {
        heading: "5. Content Availability",
        text: "The quality of the display of the streaming content may vary from device to device, and may be affected by a variety of factors, such as your location and the speed of your internet connection. Content availability may also vary by geographic location."
      },
      {
        heading: "6. Termination",
        text: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
      }
    ]
  },
  id: {
    title: "Syarat Penggunaan",
    updated: "Terakhir Diperbarui: 20 November 2025",
    sections: [
      {
        heading: "1. Penerimaan Syarat",
        text: "Dengan membuat akun atau menggunakan WeWatch, Anda setuju untuk terikat oleh Syarat ini. Jika Anda tidak setuju, mohon jangan gunakan layanan kami."
      },
      {
        heading: "2. Penggunaan Layanan",
        text: "WeWatch memberi Anda lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk mengakses dan menonton konten. Anda setuju untuk tidak mengarsipkan, mereproduksi, mendistribusikan, memodifikasi, menampilkan, menerbitkan, melisensikan, membuat karya turunan, menawarkan untuk dijual, atau menggunakan konten yang diperoleh dari WeWatch."
      },
      {
        heading: "3. Langganan & Tagihan",
        text: "Langganan WeWatch Anda akan berlanjut hingga diakhiri. Kecuali Anda membatalkan langganan sebelum tanggal tagihan, Anda mengizinkan kami untuk menagih biaya keanggotaan untuk siklus penagihan berikutnya ke Metode Pembayaran Anda."
      },
      {
        heading: "4. Keamanan Akun",
        text: "Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda. Anda setuju untuk menerima tanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda."
      },
      {
        heading: "5. Ketersediaan Konten",
        text: "Kualitas tampilan konten streaming dapat bervariasi dari satu perangkat ke perangkat lain, dan dapat dipengaruhi oleh berbagai faktor, seperti lokasi Anda dan kecepatan koneksi internet. Ketersediaan konten juga dapat bervariasi berdasarkan lokasi geografis."
      },
      {
        heading: "6. Penghentian",
        text: "Kami dapat menghentikan atau menangguhkan akses ke Layanan kami segera, tanpa pemberitahuan atau kewajiban sebelumnya, dengan alasan apa pun, termasuk namun tidak terbatas jika Anda melanggar Syarat ini."
      }
    ]
  }
};

export default function TermsPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden">
      
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
               <p className="text-sm md:text-base text-gray-400 text-justify">{section.text}</p>
             </div>
           ))}
        </div>

      </div>
    </main>
  );
}