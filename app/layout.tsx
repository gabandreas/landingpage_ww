import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import NextTopLoader from 'nextjs-toploader';
import FramerWrapper from "@/components/FrammerWrapper";
import CookieConsent from "@/components/CookieConsent";

// Import untuk Logic Analytics & Cookies
import { cookies } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] });

// Definisikan URL website (Ganti dengan domain aslimu jika sudah production)
const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://landingpage-ww.vercel.app/';

// --- METADATA SEO LENGKAP ---
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "WeWatch | Free Trial Now",
    template: "%s | WeWatch", // Agar halaman lain jadi "Judul | WeWatch"
  },
  description: "Stream unlimited movies and TV shows anytime, anywhere. Start your free trial today.",
  keywords: ["streaming", "movies", "tv shows", "watch online", "wewatch", "free trial", "asian drama"],
  authors: [{ name: "WeWatch Team" }],
  creator: "WeWatch Inc.",
  
  // Logo / Favicon
  icons: {
    icon: '/images/wewatch-trimed.png', 
    apple: '/images/wewatch-trimed.png',
  },

  // Tampilan Share di WhatsApp/FB/LinkedIn
  openGraph: {
    title: "WeWatch | Stream Unlimited Movies",
    description: "Join WeWatch today to watch the latest movies and TV series.",
    url: baseUrl,
    siteName: "WeWatch",
    images: [
      {
        url: '/images/wewatch-trimed.png', // Atau ganti gambar banner khusus share (size 1200x630)
        width: 1200,
        height: 630,
        alt: "WeWatch Streaming Platform",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Tampilan Share di Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: "WeWatch | Free Trial Now",
    description: "Stream unlimited movies and TV shows.",
    images: ['/images/wewatch-trimed.png'],
  },

  // Konfigurasi Robot Google
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// --- ROOT LAYOUT (ASYNC) ---
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 1. Ambil status cookie consent dari server
  const cookieStore = await cookies(); 
  const consentCookie = cookieStore.get('wewatch_cookie_consent');
  const isConsentGiven = consentCookie?.value === 'true';

  // 2. Ambil GA ID dari environment variable
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader 
          color="#28c2ff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        
        <LanguageProvider>
          {/* Bungkus children dengan FramerWrapper agar animasi transisi jalan */}
          <FramerWrapper>
            {children}
          </FramerWrapper>
          
          {/* Banner Cookie Consent (Muncul jika belum ada cookie) */}
          <CookieConsent />
        </LanguageProvider>

        <SpeedInsights/>
        {/* Logic Google Analytics: Hanya render jika user setuju & ID ada */}
        {isConsentGiven && gaId && <GoogleAnalytics gaId={gaId} />}
        {isConsentGiven && gaId && <Analytics/>}

        
      </body>
    </html>
  );
}