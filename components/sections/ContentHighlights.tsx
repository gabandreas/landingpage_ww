'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const posters = [
  {
    title: 'Luminous City',
    category: 'Original Series',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Arc Light',
    category: 'Feature Film',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Northern Bloom',
    category: 'Documentary',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Parallel Shift',
    category: 'Sci-Fi Anthology',
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Aurora Line',
    category: 'Limited Series',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Velocity Run',
    category: 'Live Event',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80',
  },
];

export function ContentHighlights() {
  return (
    <section
      id="content"
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
          What You Can Watch
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Originals, films, and events in one precise feed.
        </h2>
        <p className="max-w-2xl text-white/70">
          Placeholder slate showcasing the tone of our catalogue. Hover to feel
          the subtle motion system.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posters.map((poster, index) => (
          <motion.article
            key={poster.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -6 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.05, duration: 0.8 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5"
          >
            <div className="relative h-72 w-full">
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                {poster.category}
              </p>
              <h3 className="text-lg font-semibold text-white">
                {poster.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

