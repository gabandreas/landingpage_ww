import type { Metadata } from "next";
import SpeedTestClient from "@/components/sections/SpeedTestClient"; // Import client component

export const metadata: Metadata = {
  title: "Internet Speed Test | WeWatch",
  description: "Check your internet connection speed to ensure smooth streaming on WeWatch. Test your Download, Upload, and Ping instantly.",
  keywords: ["internet speed test", "wifi speed", "streaming check", "wewatch speedtest"],
  openGraph: {
    title: "WeWatch Speed Test",
    description: "Is your internet fast enough for 4K? Check now.",
    url: 'https://wewatch.asia/speedtest',
  }
};

export default function SpeedTestPage() {
  return <SpeedTestClient />;
}