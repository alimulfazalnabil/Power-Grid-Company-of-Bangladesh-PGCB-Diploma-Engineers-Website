'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';
import type { Slider } from '../../types/slider';

interface HeroContentProps {
  slide: Slider;
}

export function HeroContent({ slide }: HeroContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-3xl rounded-3xl border border-white/10 bg-slate-950/45 p-6 shadow-2xl shadow-slate-950/60 backdrop-blur-sm sm:p-8"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">PGCB</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {slide.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
        {slide.subtitle}
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
        {slide.description}
      </p>
      <Link
        href={slide.button_url as Route}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
      >
        {slide.button_text}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
