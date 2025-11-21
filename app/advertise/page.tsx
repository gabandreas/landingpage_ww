import type { Metadata } from "next";
import BusinessClient from "@/components/sections/BusinessClient"; // Import yang baru dibuat

export const metadata: Metadata = {
  title: "Advertise with WeWatch | Hospitality & Business Solutions",
  description: "Partner with WeWatch for premium hotel entertainment systems (STB) or reach our engaged audience through strategic advertising placements.",
  keywords: ["wewatch business", "hotel tv solution indonesia", "stb hotel", "ott advertising", "wewatch partnership"],
  openGraph: {
    title: "WeWatch Business Solutions",
    description: "Elevate your hotel entertainment or advertise to a premium audience.",
    url: 'https://wewatch.asia/advertise',
  }
};

export default function BusinessPage() {
  return <BusinessClient />;
}