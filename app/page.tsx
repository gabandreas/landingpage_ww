import { ContentHighlights } from "@/components/sections/ContentHighlights";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { PricingSection } from "@/components/sections/PricingSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0c]">
      <Navbar />
      <main className="flex flex-col gap-10 pb-20 pt-24">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <ContentHighlights />
        <PricingSection />
        <Footer />
      </main>
    </div>
  );
}
