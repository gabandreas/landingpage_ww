import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeWatch",
  description: "Stream unlimited movies and TV shows",
  icons: {
    icon: '/images/wewatch-trimed.png', // Ganti dengan path logo Anda di folder public
    apple: '/images/wewatch-trimed.png', // Untuk icon di iPhone/iPad
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}