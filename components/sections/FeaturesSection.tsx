'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: 'Adaptive Streaming',
    description: 'Edge-powered delivery keeps 4K UHD steady on every device.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-white">
        <rect
          x="5"
          y="10"
          width="30"
          height="20"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 25c2-4 10-4 12 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Live TV Streaming',
    description: 'AI-assisted discovery keeps every profile personal yet calm.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-white">
        <circle
          cx="20"
          cy="14"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 31c2-5 7-8 12-8s10 3 12 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M31 9l4 4m0-4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Video On Demand',
    description: 'Encrypted downloads with timed release windows and alerts.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-white">
        <rect
          x="9"
          y="14"
          width="22"
          height="16"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 14v-3a6 6 0 0 1 12 0v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Studio-Grade Audio',
    description: 'Dolby Vision & Atmos ready; automatic device handoff.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10 text-white">
        <rect
          x="12"
          y="12"
          width="16"
          height="16"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M15 20h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 16v8M32 16v8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-12 flex flex-col gap-3"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Capabilities
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Designed for premium viewing.
        </h2>
        <p className="max-w-2xl text-white/70">
          WeWatch pairs cinematic fidelity with thoughtful controls to keep the
          experience effortless and distraction-free.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              delay: index * 0.05,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="glass-panel group rounded-3xl p-6 transition duration-500 hover:shadow-[0_35px_90px_rgba(0,0,0,0.5)]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition duration-500 group-hover:border-white/30">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-white/65">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

