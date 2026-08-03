'use client';

import { Skeleton } from '../ui/skeleton';

export function HeroSkeleton() {
  return (
    <section className="relative h-[600px] overflow-hidden lg:h-[720px]">
      <Skeleton className="absolute inset-0 h-full w-full rounded-none" />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <Skeleton className="h-5 w-40 bg-slate-200/20" />

            <Skeleton className="h-16 w-full max-w-2xl bg-slate-200/20" />

            <Skeleton className="h-5 w-full max-w-xl bg-slate-200/20" />

            <Skeleton className="h-5 w-96 bg-slate-200/20" />

            <Skeleton className="h-14 w-44 rounded-lg bg-slate-200/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
