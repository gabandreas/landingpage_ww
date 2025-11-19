'use client';

import { motion } from 'framer-motion';
import { Footer } from '@/components/sections/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Data Dummy Berita
const pressReleases = [
  {
    date: "November 15, 2025",
    title: "WeWatch Meluncurkan Fitur 'Watch Party' Global",
    excerpt: "Kini pengguna dapat menonton film bersama teman dari berbagai negara secara real-time dengan sinkronisasi latensi rendah.",
    category: "Product News"
  },
  {
    date: "October 2, 2025",
    title: "Kemitraan Eksklusif dengan 5 Studio Film Besar Asia",
    excerpt: "Membawa lebih dari 500 judul film premium Asia ke platform global WeWatch mulai akhir tahun ini.",
    category: "Partnership"
  },
  {
    date: "August 20, 2025",
    title: "Laporan Pertumbuhan Q2: 10 Juta Pengguna Aktif",
    excerpt: "WeWatch mencatat pertumbuhan pengguna sebesar 150% year-on-year, didorong oleh ekspansi di Asia Tenggara.",
    category: "Business"
  }
];

// Data Download Aset
const assets = [
  { name: "WeWatch Logos", type: "ZIP", size: "12 MB" },
  { name: "Product Screenshots", type: "ZIP", size: "45 MB" },
  { name: "Executive Bios & Photos", type: "PDF", size: "5 MB" },
];

export default function MediaCenterPage() {
  return (
    <div className="min-h-screen bg-[#040714] text-white overflow-hidden selection:bg-blue-500/30">

      {/* Navbar Simple */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-[#040714]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-gray-400 group-hover:text-white transition-colors text-sm">← Back to Home</span>
          </Link>
          <div className="h-6 w-20 relative opacity-80">
             <Image src="/images/wewatch-trimed.png" alt="WeWatch" fill className="object-contain" />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-blue-400 tracking-widest text-xs uppercase font-medium mb-4">Media Center</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Latest News & <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Brand Resources.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Dapatkan update terbaru tentang WeWatch, aset brand resmi, dan informasi kontak untuk kebutuhan publikasi.
            </p>
          </motion.div>

          {/* Press Releases Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-24"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              Press Releases
              <span className="h-px flex-grow bg-white/10"></span>
            </h2>
            <div className="grid gap-6">
              {pressReleases.map((news, i) => (
                <div key={i} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full w-fit">{news.category}</span>
                    <span className="text-gray-500 text-sm">{news.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-3xl text-sm">
                    {news.excerpt}
                  </p>
                  <div className="mt-6 flex items-center text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                    Read Full Story →
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Brand Assets & Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Brand Assets */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-white mb-8">Brand Assets</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {assets.map((asset, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-[#0a0f1c] border border-white/10 hover:border-white/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{asset.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{asset.type} • {asset.size}</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-md hover:bg-white/5">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Media Contact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
               <h2 className="text-2xl font-bold text-white mb-8">Media Contact</h2>
               <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 backdrop-blur-sm">
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    Untuk pertanyaan pers, wawancara, atau kebutuhan materi publikasi lainnya, silakan hubungi tim PR kami.
                  </p>
                  <a href="mailto:press@wewatch.com" className="block w-full py-3 text-center bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors mb-3 text-sm">
                    press@wewatch.com
                  </a>
                  <p className="text-[10px] text-center text-gray-500">
                    Kami akan merespon dalam 1x24 jam kerja.
                  </p>
               </div>
            </motion.section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}