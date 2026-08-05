"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { NoticeGrid } from "./NoticeGrid";
import { NoticePagination } from "./NoticePagination";
import { NoticeSearch } from "./NoticeSearch";
import { NoticeCategoryFilter } from "./NoticeCategoryFilter";

import { useNotices } from "@/hooks/useNotices";

interface NoticeSectionProps {
  title?: string;
  description?: string;
  pageSize?: number;
  featuredOnly?: boolean;
}

export function NoticeSection({
  title = "Latest Notices",
  description = "Stay updated with our latest announcements.",
  pageSize = 9,
  featuredOnly = false,
}: NoticeSectionProps) {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const {
    data,
    isLoading,
    error,
  } = useNotices({
    page,
    page_size: pageSize,
    featured: featuredOnly,
    search,
    category: category || undefined,
  });

  return (
    <section className="py-16">

      <div className="container mx-auto">

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              {title}
            </h2>

            <p className="mt-3 text-muted-foreground">
              {description}
            </p>

          </div>

          <div className="flex w-full flex-col gap-3 md:flex-row lg:w-auto">
            <NoticeSearch loading={isLoading} />
            <NoticeCategoryFilter />
          </div>

        </div>

        <NoticeGrid
          notices={data?.items}
          loading={isLoading}
          error={error as Error}
        />

        {data && data.total > pageSize && (
          <div className="mt-10 flex justify-center">

            <NoticePagination
              currentPage={page}
              totalItems={data.total}
              pageSize={pageSize}
              onPageChange={setPage}
            />

          </div>
        )}

      </div>

    </section>
  );
}
