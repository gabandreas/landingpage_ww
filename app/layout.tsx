import type { Metadata, Viewport } from "next";
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

// 1. BASE URL yang Konsisten (Penting untuk Canonical)
const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://landingpage-ww.vercel.app';

// 2. VIEWPORT CONFIG (Mobile Friendly Score)
export const viewport: Viewport = {
  themeColor: '#040714',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// 3. METADATA SUPER LENGKAP
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  
  // Title & Desc
  title: {
    default: "WeWatch | Free Trial & Premium Asian Streaming",
    template: "%s | WeWatch", 
  },
  description: "Stream 1000+ movies, premium live TV channels, and trending short dramas. Join WeWatch for the ultimate Asian entertainment experience.",
  
  // Keywords Strategis
  keywords: [
    "streaming", "movies", "tv shows", "watch online", "wewatch", 
    "free trial", "asian drama", "live tv indonesia", "nonton film legal"
  ],
  
  // Identitas Penulis/Pemilik
  authors: [{ name: "WeWatch Team", url: baseUrl }],
  creator: "WeWatch Inc.",
  publisher: "WeWatch Inc.",
  
  // Canonical URL (Sangat Penting untuk SEO!)
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en', // Jika nanti Anda implementasi routing bahasa
      'id-ID': '/id',
    },
  },

  // Favicon & Icons
  icons: {
    icon: '/images/wewatch-trimed.png',
    shortcut: '/images/wewatch-trimed.png',
    apple: '/images/wewatch-trimed.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/wewatch-trimed.png',
    },
  },

  // Social Media Sharing (Open Graph)
  openGraph: {
    title: "WeWatch | Stream Unlimited Movies & TV",
    description: "Start your free trial today. Access premium Asian content anytime, anywhere.",
    url: baseUrl,
    siteName: "WeWatch Streaming",
    images: [
      {
        url: '/images/wewatch-trimed.png', // Disarankan: Buat gambar khusus OG ukuran 1200x630px
        width: 1200,
        height: 630,
        alt: "WeWatch Streaming Platform",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "WeWatch | Premium Asian Streaming",
    description: "Stream unlimited movies and TV shows. Start your free trial now.",
    images: ['/images/wewatch-trimed.png'],
    creator: '@wewatchasia', // Ganti dengan username twitter asli jika ada
  },

  // Verifikasi Webmaster (Isi kodenya nanti saat submit ke Google/Bing)
  verification: {
    google: 'kode-verifikasi-google-anda', 
    yandex: 'kode-verifikasi-yandex',
  },

  // Instruksi Robot
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Kategori Website
  category: 'entertainment',
};

// 4. SCHEMA.ORG ORGANIZATION (JSON-LD)
// Ini memberi tahu Google bahwa ini adalah Brand/Organisasi Resmi
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WeWatch",
  "url": baseUrl,
  "logo": `${baseUrl}/images/wewatch-trimed.png`,
  "sameAs": [
    "https://www.facebook.com/WeWatchAsia",
    "https://www.instagram.com/wewatchasia",
    "https://x.com/wewatchasia",
    "https://www.youtube.com/@WeWatchAsia"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-881-0107-33762",
    "contactType": "customer service",
    "areaServed": ["ID", "SG", "MY"],
    "availableLanguage": ["English", "Indonesian"]
  }
};

// --- ROOT LAYOUT (ASYNC) ---
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Logic Cookie & Analytics
  const cookieStore = await cookies(); 
  const consentCookie = cookieStore.get('wewatch_cookie_consent');
  const isConsentGiven = consentCookie?.value === 'true';
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* Inject JSON-LD Schema Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
          <FramerWrapper>
            {children}
          </FramerWrapper>
          <CookieConsent />
        </LanguageProvider>

        {/* Vercel Analytics & Speed Insights (Privacy Friendly) */}
        {/* Catatan: Vercel Analytics biasanya aman dijalankan tanpa consent ketat, 
            tapi jika ingin strict GDPR, biarkan di dalam kondisi isConsentGiven */}
        {isConsentGiven && (
          <>
            <SpeedInsights/>
            <Analytics/>
          </>
        )}

        {/* Google Analytics (Wajib Consent) */}
        {isConsentGiven && gaId && <GoogleAnalytics gaId={gaId} />}
        
      </body>
    </html>
  );
}