import type { Metadata } from "next";
import SubscriptionClient from "@/components/sections/SubscriptionClient"; // Import komponen client tadi

export const metadata: Metadata = {
  title: "Subscription Plans | WeWatch",
  description: "Choose your WeWatch plan. Start with a 3-day free trial or subscribe for ad-free premium Asian entertainment.",
  keywords: ["wewatch price", "wewatch subscription", "free trial streaming", "asian movies price"],
  openGraph: {
    title: "WeWatch Plans - Start Free Trial",
    description: "Unlimited Asian Entertainment starting from Rp 50.000/month.",
    url: 'https://wewatch.asia/subscription',
  }
};

// DATA UNTUK GOOGLE (Rich Snippets Harga)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "IDR",
  "offers": [
    {
      "@type": "Offer",
      "name": "3-Day Free Trial",
      "price": "0",
      "priceCurrency": "IDR",
      "description": "Free trial access for 3 days"
    },
    {
      "@type": "Offer",
      "name": "Monthly Plan",
      "price": "50000",
      "priceCurrency": "IDR",
      "description": "1 Month premium subscription"
    },
    {
      "@type": "Offer",
      "name": "Quarterly Plan",
      "price": "150000",
      "priceCurrency": "IDR",
      "description": "3 Months premium subscription"
    }
  ]
};

export default function SubscriptionPage() {
  return (
    <>
      {/* Masukkan data JSON-LD agar dibaca Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render Tampilan Utama */}
      <SubscriptionClient />
    </>
  );
}