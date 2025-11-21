import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Konfigurasi Gambar (TETAP ADA)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  // 2. Solusi Error "Invalid Source Map" (BARU DITAMBAHKAN)
  // Ini memberitahu Next.js untuk mengabaikan warning source map dari library pihak ketiga
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules/, message: /source map/ },
    ];
    return config;
  },
};

export default nextConfig;