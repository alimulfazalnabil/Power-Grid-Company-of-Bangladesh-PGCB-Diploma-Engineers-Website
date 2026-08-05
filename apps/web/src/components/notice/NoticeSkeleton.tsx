"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function NoticeSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-background
      "
    >
      {/* Thumbnail */}
      <Skeleton className="aspect-[16/9] w-full" />

      <div className="space-y-5 p-6">

        {/* Meta */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Button */}
        <Skeleton className="h-5 w-28" />

      </div>
    </div>
  );
}
