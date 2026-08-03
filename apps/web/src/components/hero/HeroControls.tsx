'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function HeroControls({ onPrevious, onNext, className = '' }: HeroControlsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto flex max-w-7xl -translate-y-1/2 justify-between px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={onPrevious}
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 md:h-14 md:w-14 lg:h-16 lg:w-16"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={onNext}
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 md:h-14 md:w-14 lg:h-16 lg:w-16"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
