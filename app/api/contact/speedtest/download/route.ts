import { NextResponse } from 'next/server';

// Mencegah caching agar tes selalu real-time mengambil data baru
export const dynamic = 'force-dynamic';

export async function GET() {
  // Kita kirim file dummy 10MB (10 * 1024 * 1024 bytes)
  const size = 10 * 1024 * 1024; 
  
  // Bikin buffer kosong ukuran 10MB
  const buffer = new Uint8Array(size);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': size.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}