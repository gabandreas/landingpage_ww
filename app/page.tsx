'use client'; // <--- WAJIB ADA

// Sesuaikan path import ini dengan lokasi file kamu sebenarnya
// Jika file ada di folder context sejajar app, pakai "../context/..."
import { LanguageProvider } from "@/context/LanguageContext"; 

import { ContentHighlights } from "@/components/sections/ContentHighlights";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/Discovery";
import { CompatibleDevicesSection } from "@/components/sections/DevicesSection";
import { LiveTVSection } from '@/components/sections/LiveTvSection'; // <--- Import

export default function Home() {
  return (
    // 👇👇👇 PEMBUNGKUS INI JANGAN SAMPAI HILANG 👇👇👇
    <LanguageProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#040714]">
        <main className="flex flex-col gap-10">
          <HeroSection />
          <FeaturesSection />
          <LiveTVSection />
          <HowItWorks />
          <ContentHighlights />
          <CompatibleDevicesSection />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
    // 👆👆👆 PEMBUNGKUS DITUTUP DISINI 👆👆👆
  );
}