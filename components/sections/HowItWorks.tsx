'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Set your profile tone',
    description: 'Define preferences and devices in under a minute.',
    detail: 'Personalized curation starts instantly.',
  },
  {
    title: 'Sync every screen',
    description: 'Link TVs, tablets, cars, and inflight systems.',
    detail: 'Secure pairing with encrypted handoffs.',
  },
  {
    title: 'Press play anywhere',
    description: 'Stream or download with adaptive fidelity.',
    detail: 'Always aware of bandwidth, battery, and context.',
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-12 flex flex-col gap-3"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          How It Works
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          A precise flow. No friction.
        </h2>
        <p className="max-w-2xl text-white/70">
          From signup to premiere night, WeWatch keeps every action polished and
          minimal.
        </p>
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.25)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="glass-panel h-full rounded-3xl border-white/5 p-6"
          >
            <div className="mb-6 flex items-center justify-between text-white/60">
              <span className="text-xs uppercase tracking-[0.6em]">
                Step {index + 1}
              </span>
              <span className="h-8 w-8 rounded-full border border-white/20 text-center text-sm leading-8">
                {index + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm text-white/70">{step.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/40">
              {step.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

