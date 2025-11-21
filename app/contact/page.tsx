'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, MapPin, MessageCircle, Send, Phone, Clock, ArrowUpRight, Loader2, CheckCircle } from 'lucide-react';

const content = {
  en: {
    title: "Get in Touch",
    subtitle: "Have a question or feedback? We are here to help 24/7.",
    cards: {
      chat: { title: "Chat with Us", desc: "Fastest response via WhatsApp", action: "Start Chat" },
      email: { title: "Email Support", desc: "For formal inquiries", action: "support@wewatch.asia" },
      visit: { title: "Visit Office", desc: "Come say hello", action: "View Map" }
    },
    form: {
      header: "Send a Message",
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      subjects: ["General Inquiry", "Technical Issue", "Payment/Billing", "Content Request"],
      message: "Message",
      btn: "Send Message",
      sending: "Sending...",
      sent: "Message Sent!"
    },
    info: {
      address: "JB Tower 10th Floor, Kebon Sirih 48-50, Central Jakarta",
      hours: "Mon - Fri: 09:00 - 18:00"
    }
  },
  id: {
    title: "Hubungi Kami",
    subtitle: "Punya pertanyaan atau masukan? Kami siap membantu 24/7.",
    cards: {
      chat: { title: "Chat Kami", desc: "Respon tercepat via WhatsApp", action: "Mulai Chat" },
      email: { title: "Email Support", desc: "Untuk pertanyaan formal", action: "support@wewatch.asia" },
      visit: { title: "Kunjungi Kantor", desc: "Datang langsung", action: "Lihat Peta" }
    },
    form: {
      header: "Kirim Pesan",
      name: "Nama Anda",
      email: "Alamat Email",
      subject: "Subjek",
      subjects: ["Pertanyaan Umum", "Masalah Teknis", "Pembayaran/Tagihan", "Request Konten"],
      message: "Pesan",
      btn: "Kirim Pesan",
      sending: "Mengirim...",
      sent: "Pesan Terkirim!"
    },
    info: {
      address: "WeWatch HQ, Cyber 2 Tower, Jl. H. R. Rasuna Said, Jakarta Selatan.",
      hours: "Sen - Jum: 09:00 - 18:00"
    }
  }
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = content[language];
  
  // State untuk UI Loading
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // State untuk Data Form (Persiapan Backend)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  // Handle Input Change
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit (Simulasi)
//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault(); 
//     setIsSending(true);

//     // SIMULASI KIRIM (2 Detik)
//     // Nanti bagian ini diganti dengan: await fetch('/api/contact', ...)
//     setTimeout(() => {
//       console.log("Form Data Submitted:", formData); // Cek console browser untuk lihat data
//       setIsSending(false);
//       setIsSent(true);
      
//       // Reset Form
//       setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });

//       // Reset Tombol setelah 3 detik
//       setTimeout(() => setIsSent(false), 3000);
//     }, 2000);
//   };

  // Handle Submit (ASLI - Connect ke API)
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSending(true);

    try {
      // Mengirim data ke API Backend yang sudah dibuat
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Jika sukses terkirim
        setIsSending(false);
        setIsSent(true);
        
        // Reset Form
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        
        // Reset tombol setelah 3 detik
        setTimeout(() => setIsSent(false), 3000);
      } else {
        // Jika server menolak (misal password salah)
        alert("Gagal mengirim pesan. Cek konfigurasi server.");
        setIsSending(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Terjadi kesalahan jaringan.");
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#040714] pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Interactive Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* WhatsApp Card */}
            <motion.a 
              href="https://wa.me/62881010733762" 
              target="_blank"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative p-6 rounded-2xl bg-[#0E1425] border border-white/10 hover:border-green-500/50 transition-all duration-300 overflow-hidden cursor-pointer"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-green-900/0 to-green-900/0 group-hover:from-green-900/10 group-hover:to-transparent transition-all duration-500"></div>
               <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                       <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-white font-bold">{t.cards.chat.title}</h3>
                       <p className="text-xs text-gray-400">{t.cards.chat.desc}</p>
                    </div>
                 </div>
                 <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
               </div>
            </motion.a>

            {/* Email Card */}
            <motion.a 
              href="mailto:info@wewatch.asia"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="group relative p-6 rounded-2xl bg-[#0E1425] border border-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden cursor-pointer"
            >
               <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                       <Mail className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-white font-bold">{t.cards.email.title}</h3>
                       <p className="text-xs text-gray-400">{t.cards.email.action}</p>
                    </div>
                 </div>
                 <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
               </div>
            </motion.a>

            {/* Address & Map Card */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="relative rounded-2xl bg-[#0E1425] border border-white/10 overflow-hidden flex-1 min-h-[250px] flex flex-col"
            >
               {/* Dark Mode Map Trick */}
               <div className="relative w-full h-40 overflow-hidden filter grayscale invert contrast-75 opacity-60 hover:opacity-80 transition-opacity duration-500">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6095051484526!2d106.82150817475028!3d-6.182986593804513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42ec99d13b5%3A0x719c024211f2c4a4!2sJB%20Tower!5e0!3m2!1sid!2sid!4v1763652358169!5m2!1sid!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    className="absolute inset-0"
                  ></iframe>
               </div>
               <div className="p-6 bg-[#0E1425] relative z-10 border-t border-white/5">
                  <div className="flex items-start gap-4">
                     <MapPin className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                     <div>
                        <p className="text-sm text-gray-300 leading-relaxed mb-2">{t.info.address}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                           <Clock className="w-3 h-3" />
                           <span>{t.info.hours}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: The Form */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-7 bg-[#0a0f1c] border border-white/10 rounded-3xl p-8 md:p-10"
          >
             <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t.form.header}</h3>
                <p className="text-sm text-gray-400">We typically reply within 24 hours.</p>
             </div>

             <form className="space-y-6" onSubmit={handleSend}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.form.name}</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#0E1425] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-700" 
                        placeholder="John Doe" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.form.email}</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#0E1425] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-700" 
                        placeholder="name@example.com" 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.form.subject}</label>
                    <div className="relative">
                        <select 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-[#0E1425] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                        >
                            {t.form.subjects.map((opt: string, i: number) => <option key={i} value={opt}>{opt}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.form.message}</label>
                   <textarea 
                      required 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#0E1425] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-all resize-none placeholder-gray-700" 
                      placeholder="..." 
                   />
                </div>

                {/* --- TOMBOL FLAT COLOR --- */}
                <button 
                  type="submit" 
                  disabled={isSending || isSent}
                  className={`w-full py-4 font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group
                    ${isSent 
                       ? 'bg-green-600 text-white cursor-default' 
                       : 'bg-blue-600 hover:bg-blue-500 text-white' // FLAT BLUE
                    }
                    ${isSending ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                   {isSending ? (
                     <>
                       <Loader2 className="w-4 h-4 animate-spin" />
                       {t.form.sending}
                     </>
                   ) : isSent ? (
                     <>
                       <CheckCircle className="w-4 h-4" />
                       {t.form.sent}
                     </>
                   ) : (
                     <>
                       {t.form.btn}
                       <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                </button>

             </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}