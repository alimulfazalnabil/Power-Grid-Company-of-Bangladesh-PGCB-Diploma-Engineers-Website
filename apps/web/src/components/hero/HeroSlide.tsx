'use client';

import Image from 'next/image';
import type { Slider } from '../../types/slider';
import { HeroContent } from './HeroContent';

interface HeroSlideProps {
  slide: Slider;
  priority?: boolean;
}

export function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  return (
    <article className="relative h-[600px] overflow-hidden lg:h-[720px]">
      <Image
        src={slide.image_url}
        alt={slide.title}
        fill
        priority={priority}
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <HeroContent slide={slide} />
        </div>
      </div>
    </article>
  );
}
