'use client';

import { useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { sliderKeys, useHomepageSliders } from '../../hooks/useSliders';
import { HeroControls } from './HeroControls';
import { HeroPagination } from './HeroPagination';
import { HeroSkeleton } from './HeroSkeleton';
import { HeroSlide } from './HeroSlide';

export default function HeroSlider() {
  const queryClient = useQueryClient();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { data, error, isLoading, refetch } = useHomepageSliders();

  const slides = useMemo(() => data ?? [], [data]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (error || slides.length === 0) {
    return (
      <section className="bg-slate-950 py-10">
        <div className="mx-auto flex h-[420px] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl shadow-slate-950/50">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-300">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">Unable to load homepage</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The hero slider data could not be loaded right now. Please try again.
            </p>
            <button
              type="button"
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: sliderKeys.all });
                refetch();
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
            >
              <RotateCcw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-slate-950">
      <Swiper
        modules={[Keyboard, Autoplay]}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.realIndex);
        }}
        keyboard
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} priority={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>

      <HeroControls
        onPrevious={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
      />

      <HeroPagination
        total={slides.length}
        activeIndex={activeSlide}
        onChange={(index) => swiperRef.current?.slideToLoop(index)}
      />
    </section>
  );
}
