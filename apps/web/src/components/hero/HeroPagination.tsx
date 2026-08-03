'use client';

import clsx from 'clsx';

interface HeroPaginationProps {
  total: number;
  activeIndex: number;
  onChange: (index: number) => void;
}

export function HeroPagination({ total, activeIndex, onChange }: HeroPaginationProps) {
  if (total <= 1) {
    return null;
  }

  return (
    <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={activeIndex === index}
          onClick={() => onChange(index)}
          className={clsx(
            'group relative h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950',
            activeIndex === index ? 'w-12 bg-primary' : 'w-3 bg-white/50 hover:bg-white',
          )}
        >
          {activeIndex === index && <span className="absolute inset-0 animate-pulse rounded-full bg-white/30" />}
        </button>
      ))}
    </div>
  );
}
