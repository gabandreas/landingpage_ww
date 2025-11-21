import type { Metadata } from "next";
import HelpCenterClient from "@/components/sections/HelpCenterClient"; // Import yang baru

export const metadata: Metadata = {
  title: "Help Center & FAQ | WeWatch",
  description: "Find answers to common questions about WeWatch subscriptions, free trials, payment methods, and troubleshooting.",
  keywords: ["wewatch help", "wewatch faq", "how to subscribe wewatch", "wewatch customer service", "cara daftar wewatch"],
  openGraph: {
    title: "WeWatch Help Center",
    description: "Need help? Find answers about plans, payments, and more.",
    url: 'https://wewatch.asia/faq',
  }
};

export default function FAQPage() {
  return <HelpCenterClient />;
}