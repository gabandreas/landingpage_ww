import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeWatch | Premium Streaming, Anywhere",
  description:
    "WeWatch delivers cinematic experiences, curated originals, and seamless streaming across every screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="soft-light antialiased">{children}</body>
    </html>
  );
}
