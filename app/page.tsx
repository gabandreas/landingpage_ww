'use client';

import { LanguageProvider } from "@/context/LanguageContext"; 
import dynamic from 'next/dynamic';

// 1. HERO SECTION (Tetap Import Biasa)
// Alasan: Hero Section muncul paling atas (Above the Fold). 
// Harus diload instan agar LCP (Largest Contentful Paint) bagus.
import { HeroSection } from "@/components/sections/HeroSection";

// 2. DYNAMIC IMPORTS (Lazy Load)
// Komponen di bawah ini tidak perlu diload detik pertama.
// Browser akan mendownloadnya secara paralel/belakangan, mengurangi beban awal (TBT).

const FeaturesSection = dynamic(() => 
  import("@/components/sections/FeaturesSection").then(mod => mod.FeaturesSection)
);

// LiveTVSection adalah yang PALING BERAT (ada video player logic).
// Kita set ssr: false agar server tidak perlu merender ini, 
// dan kita kasih loading skeleton agar layout tidak loncat (CLS).
const LiveTVSection = dynamic(() => 
  import("@/components/sections/LiveTvSection").then(mod => mod.LiveTVSection), 
  { 
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-[#0a0f1c] animate-pulse rounded-xl mx-auto max-w-7xl mt-10" />
  }
);

const HowItWorks = dynamic(() => 
  import("@/components/sections/Discovery").then(mod => mod.HowItWorks)
);

const ContentHighlights = dynamic(() => 
  import("@/components/sections/ContentHighlights").then(mod => mod.ContentHighlights)
);

const CompatibleDevicesSection = dynamic(() => 
  import("@/components/sections/DevicesSection").then(mod => mod.CompatibleDevicesSection)
);

const Footer = dynamic(() => 
  import("@/components/sections/Footer").then(mod => mod.Footer)
);

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#040714]">
        <main className="flex flex-col gap-10">
          {/* Diload langsung */}
          <HeroSection />
          
          {/* Diload terpisah (Chunking) */}
          <FeaturesSection />
          <LiveTVSection />
          <HowItWorks />
          <ContentHighlights />
          <CompatibleDevicesSection />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}