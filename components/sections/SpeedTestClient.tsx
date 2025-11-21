'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Activity, Download, Upload, RefreshCw, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const content = {
  en: {
    title: "Internet Speed Test",
    subtitle: "Check your connection for seamless streaming.",
    startBtn: "Start Test",
    testing: "Testing...",
    againBtn: "Test Again",
    labels: {
      ping: "Ping",
      download: "Download",
      upload: "Upload",
      jitter: "Jitter"
    },
    resultMsg: {
      good: "Excellent! Your connection is perfect for 4K streaming.",
      ok: "Good. You can stream in HD (1080p) smoothly.",
      bad: "Connection is unstable. You might experience buffering."
    }
  },
  id: {
    title: "Cek Kecepatan Internet",
    subtitle: "Periksa koneksi Anda untuk streaming lancar.",
    startBtn: "Mulai Tes",
    testing: "Sedang Menguji...",
    againBtn: "Uji Lagi",
    labels: {
      ping: "Ping",
      download: "Unduh",
      upload: "Unggah",
      jitter: "Jitter"
    },
    resultMsg: {
      good: "Sempurna! Koneksi Anda pas untuk streaming 4K.",
      ok: "Bagus. Anda bisa streaming HD (1080p) dengan lancar.",
      bad: "Koneksi tidak stabil. Mungkin akan terjadi buffering."
    }
  }
};

export default function SpeedTestClient() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  // State Mesin Test
  const [status, setStatus] = useState<'idle' | 'testing' | 'finished'>('idle');
  const [phase, setPhase] = useState<'ping' | 'download' | 'upload' | 'done'>('ping');
  
  // Data Angka
  const [ping, setPing] = useState(0);
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [progress, setProgress] = useState(0);

  // Logic Simulasi (Agar terlihat nyata)
  const runTest = () => {
    setStatus('testing');
    setPhase('ping');
    setPing(0); setDownload(0); setUpload(0); setProgress(0);

    // 1. Simulasi Ping (Cepat)
    let p = 0;
    const pingInterval = setInterval(() => {
      p += 2;
      setPing(Math.floor(Math.random() * 10) + 15); // Random 15-25ms
      setProgress(p);
      if (p >= 20) {
        clearInterval(pingInterval);
        setPhase('download');
        startDownload();
      }
    }, 50);
  };

  const startDownload = () => {
    let p = 20;
    const dlInterval = setInterval(() => {
      p += 1;
      setProgress(p);
      // Angka naik pelan lalu cepat
      setDownload(prev => {
        if (p < 40) return prev + Math.random() * 2;
        if (p < 50) return prev + Math.random() * 10;
        return prev + (Math.random() * 2 - 1); // Stabil di angka tinggi
      });

      if (p >= 60) {
        clearInterval(dlInterval);
        setPhase('upload');
        startUpload();
      }
    }, 50);
  };

  const startUpload = () => {
    let p = 60;
    const ulInterval = setInterval(() => {
      p += 1;
      setProgress(p);
      setUpload(prev => prev + Math.random() * 5);

      if (p >= 100) {
        clearInterval(ulInterval);
        setPhase('done');
        setStatus('finished');
        setProgress(100);
      }
    }, 50);
  };

  // Tentukan Pesan Hasil
  const getResult = () => {
    if (download > 50) return t.resultMsg.good;
    if (download > 15) return t.resultMsg.ok;
    return t.resultMsg.bad;
  };

  return (
    <main className="min-h-screen bg-[#040714] pt-28 pb-20 px-6 relative font-sans flex flex-col items-center">
      
      {/* Background Grid Halus */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5 pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10">
        
        {/* --- LANGUAGE TOGGLE (Pojok Kanan Atas) --- */}
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
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
             {t.title}
           </h1>
           <p className="text-gray-400">
             {t.subtitle}
           </p>
        </div>

        {/* --- MAIN SPEED GAUGE --- */}
        <div className="bg-[#0E1425] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mb-8 relative overflow-hidden">
           
           {/* Progress Bar Top */}
           <div className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-200 ease-linear" style={{ width: `${progress}%` }} />

           <div className="flex flex-col items-center justify-center min-h-[200px]">
              
              {status === 'idle' && (
                 <div className="text-center">
                    <Wifi className="w-20 h-20 text-gray-600 mx-auto mb-6 opacity-50" />
                    <button 
                      onClick={runTest}
                      className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      {t.startBtn}
                    </button>
                 </div>
              )}

              {(status === 'testing' || status === 'finished') && (
                 <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">
                       {phase === 'ping' ? t.labels.ping : phase === 'upload' ? t.labels.upload : t.labels.download}
                    </div>
                    <div className="flex items-baseline justify-center gap-2">
                       <span className="text-7xl md:text-8xl font-bold text-white tracking-tighter tabular-nums">
                          {phase === 'ping' 
                             ? ping 
                             : phase === 'upload' ? upload.toFixed(1) : download.toFixed(1)
                          }
                       </span>
                       <span className="text-xl text-gray-500 font-medium">
                          {phase === 'ping' ? 'ms' : 'Mbps'}
                       </span>
                    </div>
                    {status === 'finished' && (
                       <div className="mt-8 animate-fade-in">
                          <p className={`text-sm font-medium px-4 py-2 rounded-lg inline-block ${download > 20 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                             {getResult()}
                          </p>
                          <div className="mt-6">
                             <button onClick={runTest} className="flex items-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors text-sm">
                                <RefreshCw className="w-4 h-4" /> {t.againBtn}
                             </button>
                          </div>
                       </div>
                    )}
                 </div>
              )}
           </div>
        </div>

        {/* --- STATS GRID (Clean Look) --- */}
        <div className="grid grid-cols-3 gap-4">
           <StatBox 
              label={t.labels.ping} 
              value={ping > 0 ? `${ping} ms` : '-'} 
              icon={<Activity className="w-4 h-4 text-yellow-500" />} 
              active={phase === 'ping'}
           />
           <StatBox 
              label={t.labels.download} 
              value={download > 0 ? `${download.toFixed(1)}` : '-'} 
              unit="Mbps"
              icon={<Download className="w-4 h-4 text-blue-500" />} 
              active={phase === 'download'}
           />
           <StatBox 
              label={t.labels.upload} 
              value={upload > 0 ? `${upload.toFixed(1)}` : '-'} 
              unit="Mbps"
              icon={<Upload className="w-4 h-4 text-purple-500" />} 
              active={phase === 'upload'}
           />
        </div>

      </div>
    </main>
  );
}

function StatBox({ label, value, unit, icon, active }: any) {
   return (
      <div className={`bg-[#0E1425] border rounded-2xl p-6 flex flex-col items-center justify-center transition-colors duration-300 ${active ? 'border-blue-500/50 bg-blue-900/10' : 'border-white/5'}`}>
         <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-bold mb-2">
            {icon} {label}
         </div>
         <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
            {value} <span className="text-xs text-gray-600 font-normal">{unit}</span>
         </div>
      </div>
   )
}