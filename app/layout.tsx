import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import NextTopLoader from 'nextjs-toploader';
import FramerWrapper from "@/components/FrammerWrapper";
import CookieConsent from "@/components/CookieConsent";

// 1. Import cookies dan GoogleAnalytics
import { cookies } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

// ... (metadata kamu tetap sama) ...

// 2. PENTING: Tambahkan kata kunci 'async' di sini
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 3. PENTING: Tambahkan 'await' di sini
  const cookieStore = await cookies(); 
  const consentCookie = cookieStore.get('wewatch_cookie_consent');
  const isConsentGiven = consentCookie?.value === 'true';

  // Ambil GA ID dari env
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
          <FramerWrapper>
            {children}
          </FramerWrapper>
          {/* Banner Cookie Consent */}
          <CookieConsent />
        </LanguageProvider>

        {/* Logic Google Analytics */}
        {isConsentGiven && gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}