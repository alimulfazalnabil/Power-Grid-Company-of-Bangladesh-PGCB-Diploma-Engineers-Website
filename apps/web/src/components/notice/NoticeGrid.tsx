"use client";

import { AlertCircle, FileText } from "lucide-react";

import { NoticeCard } from "./NoticeCard";
import { NoticeSkeleton } from "./NoticeSkeleton";

import type { NoticeSummary } from "@/services/notice.service";

interface NoticeGridProps {
  notices?: NoticeSummary[];
  loading?: boolean;
  error?: Error | null;
  skeletonCount?: number;
}

export function NoticeGrid({
  notices = [],
  loading = false,
  error = null,
  skeletonCount = 6,
}: NoticeGridProps) {
  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({
          length: skeletonCount,
        }).map((_, index) => (
          <NoticeSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          border-red-200
          bg-red-50
          py-16
          text-center
        "
      >
        <AlertCircle
          size={48}
          className="mb-4 text-red-600"
        />

        <h3 className="text-xl font-semibold">
          Failed to load notices
        </h3>

        <p className="mt-2 text-muted-foreground">
          {error.message}
        </p>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          py-20
        "
      >
        <FileText
          size={56}
          className="mb-4 text-muted-foreground"
        />

        <h3 className="text-2xl font-semibold">
          No notices found
        </h3>

        <p className="mt-3 text-muted-foreground">
          There are currently no notices available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-8
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          notice={notice}
        />
      ))}
    </div>
  );
}
