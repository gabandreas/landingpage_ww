import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // 1. Ambil data dari Frontend
    const { name, email, subject, message } = await request.json();

    // 2. Validasi sederhana
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // 3. Konfigurasi Transporter (Kurir Email)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Sesuaikan jika pakai hosting lain (cpanel/zoho)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Setup Isi Email
    const mailOptions = {
      from: `WeWatch Website <${process.env.EMAIL_USER}>`, // Pengirim
      to: process.env.EMAIL_TO, // Penerima (Tim Support)
      replyTo: email, // Agar pas di-reply langsung ke email user
      subject: `[New Inquiry] ${subject} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2563EB;">New Message from WeWatch Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <h3>Message:</h3>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // 5. Kirim Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}