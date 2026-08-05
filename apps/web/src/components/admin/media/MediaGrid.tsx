"use client";

import { MediaCard } from "./MediaCard";

import { useMedia } from "@/hooks/useMedia";
import { Skeleton } from "@/components/ui/skeleton";

export function MediaGrid() {
  const { data, isLoading, error } = useMedia({ page: 1, page_size: 24, sort: "newest" });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="rounded-xl border border-destructive/40 p-4 text-sm">Failed to load media.</div>;
  }

  const items = data?.items ?? [];

  if (items.length === 0) {
    return <div className="rounded-xl border p-8 text-sm text-muted-foreground">No media files uploaded yet.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
      {items.map((file) => (
        <MediaCard key={file.id} file={file} />
      ))}
    </div>
  );
}