'use client';

import { motion } from 'framer-motion';
import { Footer } from '@/components/sections/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#040714] text-white overflow-hidden selection:bg-blue-500/30">
      
      {/* Simple Navbar for Inner Pages */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-[#040714]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-gray-400 group-hover:text-white transition-colors">← Back to Home</span>
          </Link>
          <div className="h-6 w-20 relative opacity-80">
             <Image src="/images/wewatch-trimed.png" alt="WeWatch" fill className="object-contain" />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-blue-400 tracking-widest text-xs uppercase font-medium mb-4">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Redefining Entertainment <br /> for Southeast Asia.
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              WeWatch started with a simple mission: to bridge cultures through stories. 
              Today, we connect millions of viewers to the content they love, seamlessly.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {[
              { label: "Active Users", value: "2M+" },
              { label: "Countries", value: "11" },
              { label: "Premium Titles", value: "15k+" },
              { label: "Downloads", value: "5M+" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Content Sections */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="space-y-16 text-gray-300 leading-7"
          >
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Who We Are</h2>
              <p>
                Founded in 2020, WeWatch is a leading OTT platform dedicated to bringing premium Asian and Hollywood content to Southeast Asia. We believe that great stories transcend borders. Whether it's a K-Drama that makes you cry, or a blockbuster that keeps you on the edge of your seat, we deliver it in stunning 4K quality.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Technology</h2>
              <p className="mb-4">
                We don't just license movies; we build the stage. Our proprietary <strong>Adaptive Streaming Engine</strong> ensures that even in areas with unstable internet connections, your viewing experience remains buffer-free.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>Edge-powered delivery network.</li>
                <li>AI-driven content recommendation.</li>
                <li>Dolby Vision & Atmos support on mobile.</li>
              </ul>
            </section>
          </motion.div>

        </div>
      </main>

      {/* Reuse Footer */}
      <Footer />
    </div>
  );
}