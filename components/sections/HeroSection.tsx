'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ButtonLink } from '../ui/ButtonLink';

const floatingBadges = [
  {
    label: 'Dolby Atmos',
    detail: 'Spatial audio ready',
    className: 'right-4 top-10',
    duration: 8,
    delay: 0,
  },
  {
    label: 'Ultra 4K',
    detail: 'Dynamic range',
    className: 'left-6 top-[46%]',
    duration: 7,
    delay: 0.6,
  },
  {
    label: 'Secure Sync',
    detail: 'Profiles linked',
    className: 'right-6 bottom-10',
    duration: 9,
    delay: 1,
  },
];

const getAppStoreUrl = () => {
    // URL toko aplikasi
    const iOS_URL = "https://apps.apple.com/id/app/wewatch-everywhere/id1533557464"; 
    const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.wewatch.android&pcampaignid=web_share";
    const HUAWEI_URL = "https://appgallery.huawei.com/app/C104739437";
    
    // Default arahkan ke App Store untuk desktop
    const DESKTOP_DEFAULT_URL = HUAWEI_URL; // Default ke App Store untuk desktop
    
    console.log('=== getAppStoreUrl dipanggil ===');
    
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|huawei|matepad|honor|harmonyos/i.test(userAgent);
      
      console.log('User Agent:', userAgent);
      
      // Deteksi perangkat mobile
      if (isMobile) {
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isHuawei = /huawei|matepad|honor|harmonyos/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        console.log('Hasil Deteksi Mobile - isIOS:', isIOS, '| isHuawei:', isHuawei, '| isAndroid:', isAndroid);

        if (isIOS) {
          console.log('Mengarahkan ke App Store:', iOS_URL);
          return iOS_URL;
        }
        if (isHuawei) {
          console.log('Mengarahkan ke AppGallery Huawei:', HUAWEI_URL);
          return HUAWEI_URL;
        }
        if (isAndroid) {
          console.log('Mengarahkan ke Google Play Store:', ANDROID_URL);
          return ANDROID_URL;
        }
      }
      
      // Default untuk desktop atau perangkat yang tidak dikenali
      console.log('Menggunakan URL default untuk desktop:', DESKTOP_DEFAULT_URL);
      return DESKTOP_DEFAULT_URL;
    }
    
    // Fallback untuk SSR
    console.log('Window tidak tersedia (mungkin SSR). Menggunakan URL default desktop.');
    return iOS_URL;
};

export function HeroSection() {


  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const panelOffset = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-highlight relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-24 sm:px-6 md:gap-12 lg:flex-row lg:items-center lg:py-32 lg:gap-16"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
        className="pointer-events-none absolute -left-10 top-10 h-[420px] w-[420px] rounded-full bg-[#28c2ff]/25 blur-[140px]"
      />
      <motion.div
        style={{ opacity: glowOpacity }}
        animate={{ rotate: -360 }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
        className="pointer-events-none absolute right-[-80px] top-0 h-[360px] w-[360px] rounded-full bg-[#007aff]/20 blur-[160px]"
      />
      <div className="flex flex-1 flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-white/50">
            Premium Streaming
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Here. There. Everywhere.
          </h1>
          <p className="max-w-xl text-base text-white/70 sm:text-lg">
            Discover cinematic stories, real-time premieres, and curated picks
            built for the way you watch—across every screen, In WeWatch Platform.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          <ButtonLink 
            href={getAppStoreUrl()} // Menggunakan logika deteksi OS
            variant="primary" 
            target="_blank" 
            rel="noopener noreferrer" 
          >
            Get Started
          </ButtonLink>
          <ButtonLink href="#features" variant="secondary">
            Explore Plans
          </ButtonLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-wrap gap-4 text-sm text-white/60 sm:gap-6 sm:flex-nowrap"
        >
          <div>
            <p className="text-white">4K HDR</p>
            <span>Dolby Vision</span>
          </div>
          <div>
            <p className="text-white">Offline</p>
            <span>Secure downloads</span>
          </div>
          <div>
            <p className="text-white">Profiles</p>
            <span>Personal recommendations</span>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex w-full flex-1 lg:mt-0"
      >
        <motion.div
          style={{ y: panelOffset, scale: panelScale }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="glass-panel relative w-full overflow-hidden rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(17,17,19,0.8),rgba(17,17,19,0.3))] p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(40,194,255,0.3),_transparent_65%)]" />
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Live Now
                </p>
                <p className="text-lg text-white">The Horizon Archive</p>
              </div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Ultra
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {['Pulse', 'Nova', 'Eclipse'].map((title, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.15 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/40"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(40,194,255,0.4),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.6))]" />
                  <div className="relative flex h-full flex-col justify-end p-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                      {index + 1}
                    </p>
                    <p className="text-sm font-medium">{title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
              Curated by WeWatch Studios · Originals, documentaries, and events
              refreshed daily.
            </div>
          </div>
          {floatingBadges.map((badge) => (
            <motion.div
              key={badge.label}
              className={`pointer-events-none absolute ${badge.className} z-10 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur`}
              animate={{ y: ['0%', '-12%', '0%'] }}
              transition={{
                duration: badge.duration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: badge.delay,
              }}
            >
              <div className="text-[10px] text-white/50">{badge.label}</div>
              <div className="text-[11px] font-semibold tracking-[0.1em] text-white">
                {badge.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

