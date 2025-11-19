'use client';

import { motion } from 'framer-motion';
import { ButtonLink } from '../ui/ButtonLink';

const plans = [
  {
    name: 'Signature',
    price: '$14',
    cadence: '/month',
    features: [
      '4K HDR + Dolby Vision',
      'Two devices simultaneous',
      'Offline vault access',
      'Priority premiere alerts',
    ],
    accent: false,
  },
  {
    name: 'Studio',
    price: '$24',
    cadence: '/month',
    features: [
      'Unlimited devices',
      'Live events in Atmos',
      'Invite-only screenings',
      'White-glove concierge',
    ],
    accent: true,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
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
          Pricing
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Choose the way you watch.
        </h2>
        <p className="max-w-2xl text-white/70">
          Every plan is crafted for cinematic fidelity. Upgrade or downgrade any
          time from your profile hub.
        </p>
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`rounded-3xl p-8 ${
              plan.accent ? 'glass-panel border-white/20' : 'glass-panel'
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.6em] text-white/50">
                  Plan
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  {plan.name}
                </h3>
              </div>
              {plan.accent && (
                <span className="rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
                  Most Selected
                </span>
              )}
            </div>
            <div className="mb-6 flex items-end gap-2">
              <p className="text-5xl font-semibold text-white">{plan.price}</p>
              <span className="text-white/60">{plan.cadence}</span>
            </div>
            <ul className="mb-8 space-y-3 text-sm text-white/70">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#28c2ff] to-[#007aff]" />
                  {feature}
                </li>
              ))}
            </ul>
            {/* <ButtonLink
              href="#home"
              variant={plan.accent ? 'primary' : 'secondary'}
              className="w-full justify-center"
            >
              Start Watching
            </ButtonLink> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

