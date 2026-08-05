"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Eye,
  Pin,
  ArrowRight,
} from "lucide-react";

import { format } from "date-fns";

import type { Route } from "next";
import type { NoticeSummary } from "@/services/notice.service";

interface NoticeCardProps {
  notice: NoticeSummary;
}

export function NoticeCard({
  notice,
}: NoticeCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative aspect-[16/9]">

        <Image
          src={
            notice.thumbnail ??
            "/images/placeholder-notice.jpg"
          }
          alt={notice.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {notice.is_featured && (
          <div
            className="
              absolute
              left-4
              top-4
              flex
              items-center
              gap-1
              rounded-full
              bg-primary
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            <Pin size={14} />
            Featured
          </div>
        )}

      </div>

      <div className="space-y-4 p-6">

        <div
          className="
            flex
            items-center
            justify-between
            text-sm
            text-muted-foreground
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Calendar size={16} />

            {notice.published_at
              ? format(
                  new Date(
                    notice.published_at
                  ),
                  "dd MMM yyyy"
                )
              : "Draft"}
          </div>

          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <Eye size={16} />
            {notice.view_count}
          </div>
        </div>

        <h3
          className="
            line-clamp-2
            text-xl
            font-bold
            transition-colors
            group-hover:text-primary
          "
        >
          {notice.title}
        </h3>

        <p
          className="
            line-clamp-3
            text-sm
            text-muted-foreground
          "
        >
          {notice.summary}
        </p>

        <Link
          href={`/notices/${notice.slug}` as Route}
          className="
            inline-flex
            items-center
            gap-2
            font-medium
            text-primary
            transition-all
            hover:gap-3
          "
        >
          Read More

          <ArrowRight size={18} />
        </Link>

      </div>
    </article>
  );
}
