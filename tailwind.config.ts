import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Pastikan path ini sesuai dengan struktur folder Anda
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Jika Anda tidak menggunakan folder 'src', gunakan ini:
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Menambahkan animasi custom disini
      animation: {
        'blob-slow': 'blob 12s infinite alternate', // Durasi 12 detik, loop selamanya
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      // Opsional: Mendaftarkan warna custom agar bisa dipanggil via class (misal: bg-ww-bg)
      colors: {
        'ww-bg': '#040714',
        'ww-surface': '#0a0f1c',
      }
    },
  },
  plugins: [],
};

export default config;