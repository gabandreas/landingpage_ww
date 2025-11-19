'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 text-sm text-white/60"
    >
      <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-black/20 px-8 py-6 backdrop-blur-xl md:flex-row md:items-center">
        <div className="text-lg font-semibold tracking-[0.2em] text-white">
          WeWatch
        </div>
        <div className="flex flex-wrap gap-6 text-white/60">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/40">
        © {new Date().getFullYear()} WeWatch. All rights reserved.
      </p>
    </motion.footer>
  );
}

