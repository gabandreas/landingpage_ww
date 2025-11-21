'use client';

import { LazyMotion, domAnimation } from "framer-motion";

export default function FramerWrapper({ children }: { children: React.ReactNode }) {
  // "domAnimation" hanya memuat fitur animasi dasar (transform, opacity, dll).
  // Ini jauh lebih ringan daripada bundle full framer-motion.
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}