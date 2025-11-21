import type { Metadata } from "next";
import ContactClient from "@/components/sections/ContactClient"; // Import client component

export const metadata: Metadata = {
  title: "Contact Us | WeWatch Support",
  description: "Need help? Contact WeWatch support team via Chat, Email, or visit our office. We are here 24/7 to assist you.",
  keywords: ["contact wewatch", "wewatch support", "wewatch customer service", "hubungi wewatch", "alamat wewatch"],
  openGraph: {
    title: "Contact WeWatch Support",
    description: "Get in touch with our team for support and inquiries.",
    url: 'https://wewatch.asia/contact',
  }
};

export default function ContactPage() {
  return <ContactClient />;
}