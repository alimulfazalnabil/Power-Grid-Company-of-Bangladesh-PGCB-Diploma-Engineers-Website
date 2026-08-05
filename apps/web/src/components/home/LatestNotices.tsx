"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { NoticeGrid } from "@/components/notice/NoticeGrid";
import { useLatestNotices } from "@/hooks/useNotices";

export function LatestNotices() {
  const {
    data,
    isLoading,
    error,
  } = useLatestNotices(6);

  return (
    <section className="py-20">

      <div className="container mx-auto">

        <div className="mb-12 flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              Latest Notices
            </h2>

            <p className="mt-3 text-muted-foreground">
              Stay informed with our latest announcements,
              circulars and updates.
            </p>

          </div>

          <Button asChild>

            <Link href="/notices">

              View All

              <ArrowRight className="ml-2 h-4 w-4" />

            </Link>

          </Button>

        </div>

        <NoticeGrid
          notices={data}
          loading={isLoading}
          error={error as Error}
        />

      </div>

    </section>
  );
}
