'use client';

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ButtonLink } from '../ui/ButtonLink';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 25,
    mass: 0.6,
  });
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHasScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6"
    >
      <motion.nav
        animate={{
          backgroundColor: hasScrolled ? 'rgba(11,11,12,0.94)' : 'rgba(11,11,12,0.75)',
          borderColor: hasScrolled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
          boxShadow: hasScrolled
            ? '0 30px 80px rgba(0,0,0,0.65)'
            : '0 20px 60px rgba(0,0,0,0.4)',
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex w-full max-w-6xl items-center justify-between rounded-[28px] border px-6 py-4 backdrop-blur-3xl"
      >
        <Link
          href="#home"
          className="text-lg font-semibold tracking-[0.2em] text-white/90"
        >
          WeWatch
        </Link>
        <div className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
          {navLinks.map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ y: -2, color: '#ffffff' }}
              transition={{ duration: 0.25 }}
            >
              <Link href={link.href}>{link.label}</Link>
            </motion.div>
          ))}
        </div>
        {/* <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden sm:flex"
        >
          <ButtonLink href="#pricing">Watch Now</ButtonLink>
        </motion.div> */}
        <motion.span
          style={{ scaleX: progress }}
          className="pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-left bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </motion.nav>
    </motion.header>
  );
}

