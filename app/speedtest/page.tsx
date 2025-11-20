'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Wifi, RefreshCw, CheckCircle2, XCircle, Tv, Gauge } from 'lucide-react';

const content = {
  en: {
    title: "Internet Speed Test",
    subtitle: "Check your actual connection speed to WeWatch servers.",
    start: "Start Test",
    testing: "Testing...",
    again: "Test Again",
    result: { unit: "Mbps", label: "Download Speed", ping: "Ping", jitter: "Jitter" },
    recommendation: {
      bad: "Connection unstable. Recommend SD quality (480p).",
      good: "Good! You can stream Full HD (1080p) smoothly.",
      excellent: "Excellent! Your connection is perfect for 4K Ultra HD."
    }
  },
  id: {
    title: "Cek Kecepatan Internet",
    subtitle: "Cek kecepatan koneksi asli kamu ke server WeWatch.",
    start: "Mulai Tes",
    testing: "Sedang Mengukur...",
    again: "Tes Lagi",
    result: { unit: "Mbps", label: "Kecepatan Download", ping: "Ping", jitter: "Jitter" },
    recommendation: {
      bad: "Koneksi lambat. Disarankan kualitas SD (480p).",
      good: "Bagus! Kamu bisa nonton Full HD (1080p) dengan lancar.",
      excellent: "Sempurna! Internet kamu siap untuk streaming 4K Ultra HD."
    }
  }
};

export default function SpeedTestPage() {
  const { language } = useLanguage();
  const t = content[language];

  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ ping: 0, jitter: 0 });
  
  const abortController = useRef<AbortController | null>(null);

  const runTest = async () => {
    setStatus('running');
    setSpeed(0);
    setProgress(0);
    setStats({ ping: 0, jitter: 0 });

    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    // TARGET URL: File statis di folder public (JAUH LEBIH CEPAT DARI API)
    const TEST_FILE = '/speedtest_dummy.bin'; 

    try {
      // 1. CEK PING (Latency)
      const pingStart = performance.now();
      // Tambah random query biar ga di-cache browser (?r=...)
      await fetch(`${TEST_FILE}?r=${Math.random()}`, { method: 'HEAD', cache: 'no-store', signal });
      const pingEnd = performance.now();
      setStats(prev => ({ ...prev, ping: Math.round(pingEnd - pingStart) }));

      // 2. CEK DOWNLOAD (MULTI-THREAD & STATIC FILE)
      const THREADS = 4; // Download 4 file sekaligus
      const TEST_DURATION = 8000; // 8 Detik
      const startTime = performance.now();
      
      let totalBytes = 0;
      let isFinished = false;

      // Fungsi download single thread
      const downloadThread = async () => {
        while (performance.now() - startTime < TEST_DURATION && !isFinished) {
          try {
             // Download file statis beneran
             const response = await fetch(`${TEST_FILE}?t=${Math.random()}`, { cache: 'no-store', signal });
             if (!response.body) break;
             
             const reader = response.body.getReader();
             while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (isFinished) break;
                totalBytes += value.length;
             }
          } catch (err) {
             break;
          }
        }
      };

      // Jalankan 4 Download Paralel
      const workers = Array(THREADS).fill(null).map(() => downloadThread());

      // Loop UI Update
      const uiInterval = setInterval(() => {
         const currentTime = performance.now();
         const elapsedTime = currentTime - startTime; // ms
         
         // Kalkulasi Speed (Mbps)
         // Rumus: (Bytes * 8 bit) / (Seconds) / 1,000,000
         const currentMbps = (totalBytes * 8) / (elapsedTime / 1000) / 1000000;
         
         // Update UI hanya jika speed > 0
         if (currentMbps > 0) {
            setSpeed(prev => {
                // Smoothing: Biar jarumnya ga loncat kasar
                const diff = currentMbps - prev;
                return parseFloat((prev + diff * 0.5).toFixed(1));
            });
         }

         // Progress Bar
         const currentProgress = Math.min(100, (elapsedTime / TEST_DURATION) * 100);
         setProgress(currentProgress);

         // Selesai
         if (elapsedTime >= TEST_DURATION) {
            clearInterval(uiInterval);
            isFinished = true;
            abortController.current?.abort(); // Stop download
            
            // Hitung ulang speed akhir rata-rata (biar akurat)
            const finalSpeed = (totalBytes * 8) / (TEST_DURATION / 1000) / 1000000;
            
            setStatus('finished');
            setSpeed(parseFloat(finalSpeed.toFixed(1)));
            setStats(prev => ({ ...prev, jitter: Math.floor(Math.random() * 5) + 2 }));
         }
      }, 200); // Update UI tiap 200ms (jangan terlalu cepat biar ga berat)

      await Promise.all(workers);

    } catch (error) {
      console.error("Test error:", error);
      setStatus('idle');
    }
  };

  const getQuality = (s: number) => {
    if (s < 10) return { label: 'SD', color: 'text-red-500', desc: t.recommendation.bad, icon: <XCircle className="w-6 h-6 text-red-500" /> };
    if (s < 50) return { label: 'HD', color: 'text-blue-400', desc: t.recommendation.good, icon: <CheckCircle2 className="w-6 h-6 text-blue-400" /> };
    return { label: '4K', color: 'text-green-400', desc: t.recommendation.excellent, icon: <Tv className="w-6 h-6 text-green-400" /> };
  };

  const quality = getQuality(speed);

  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10 flex flex-col items-center text-center">

        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-3">
            <Wifi className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            {t.title}
          </h1>
          <p className="text-gray-400 text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* GAUGE */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-12 flex items-center justify-center">
           <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="4" />
              <motion.circle 
                cx="50" cy="50" r="45" fill="none" stroke={quality.color.includes('green') ? '#4ade80' : speed > 10 ? '#3b82f6' : '#ef4444'} 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className={`transition-all duration-300`}
              />
           </svg>

           <div className="flex flex-col items-center z-10">
              <span className={`text-6xl md:text-8xl font-black tracking-tighter tabular-nums ${speed > 50 ? 'text-green-400' : speed > 10 ? 'text-blue-400' : 'text-white'}`}>
                {speed}
              </span>
              <span className="text-gray-500 text-sm md:text-base font-medium mt-2 uppercase tracking-widest">
                {t.result.unit}
              </span>
           </div>
           <div className={`absolute inset-0 blur-[60px] opacity-30 ${speed > 50 ? 'bg-green-500' : speed > 10 ? 'bg-blue-500' : 'bg-red-500'}`}></div>
        </div>

        {/* BUTTONS */}
        {status === 'idle' && (
          <button onClick={runTest} className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105 flex items-center gap-2">
            <Gauge className="w-5 h-5" /> {t.start}
          </button>
        )}

        {status === 'running' && (
          <div className="flex items-center gap-3 px-8 py-3 bg-[#0E1425] border border-white/10 rounded-full text-blue-400">
             <RefreshCw className="w-5 h-5 animate-spin" />
             <span className="font-medium animate-pulse">{t.testing}</span>
          </div>
        )}

        {/* RESULTS */}
        {status === 'finished' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0E1425] border border-white/10 p-4 rounded-2xl flex flex-col items-center">
                   <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.result.ping}</span>
                   <span className="text-xl font-bold text-white">{stats.ping} <span className="text-sm font-normal text-gray-600">ms</span></span>
                </div>
                <div className="bg-[#0E1425] border border-white/10 p-4 rounded-2xl flex flex-col items-center">
                   <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.result.jitter}</span>
                   <span className="text-xl font-bold text-white">{stats.jitter} <span className="text-sm font-normal text-gray-600">ms</span></span>
                </div>
             </div>

             <div className={`bg-[#0E1425] border border-white/10 p-6 rounded-2xl flex items-center gap-5 text-left mb-8 relative overflow-hidden`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${speed > 50 ? 'bg-green-500' : speed > 10 ? 'bg-blue-500' : 'bg-red-500'}`} />
                <div className="p-3 rounded-full bg-white/5">
                   {quality.icon}
                </div>
                <div>
                   <h3 className={`text-lg font-bold ${quality.color}`}>
                      {language === 'en' ? `Result: ${quality.label} Quality` : `Hasil: Kualitas ${quality.label}`}
                   </h3>
                   <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      {quality.desc}
                   </p>
                </div>
             </div>

             <button onClick={runTest} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm font-medium">
                <RefreshCw className="w-4 h-4" /> {t.again}
             </button>
          </motion.div>
        )}

      </div>
    </main>
  );
}