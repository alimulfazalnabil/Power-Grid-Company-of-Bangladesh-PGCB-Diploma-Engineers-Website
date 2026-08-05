"use client";

import Link from "next/link";
import Image from "next/image";
import { Pin, ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useFeaturedNotices } from "@/hooks/useNotices";

export function FeaturedNotices() {
  const {
    data,
    isLoading,
    error,
  } = useFeaturedNotices(3);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto">
          <Skeleton className="h-[420px] rounded-3xl" />
        </div>
      </section>
    );
  }

  if (error || !data || data.length === 0) {
    return null;
  }

  const [hero, ...others] = data;

  return (
    <section className="bg-muted/30 py-20">

      <div className="container mx-auto">

        <div className="mb-12 flex items-center justify-between">

          <div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">

              <Pin className="h-4 w-4" />

              Featured

            </div>

            <h2 className="text-4xl font-bold">
              Featured Notices
            </h2>

            <p className="mt-3 text-muted-foreground">
              Important announcements from the organization.
            </p>

          </div>

          <Button asChild>

            <Link href="/notices">

              All Notices

              <ArrowRight className="ml-2 h-4 w-4" />

            </Link>

          </Button>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Hero Card */}

          <Link
            href={`/notices/${hero.slug}`}
            className="group lg:col-span-2"
          >

            <article className="overflow-hidden rounded-3xl border bg-background shadow-sm transition hover:shadow-xl">

              <div className="relative aspect-[16/9]">

                <Image
                  src={
                    hero.thumbnail ??
                    "/images/placeholder-notice.jpg"
                  }
                  alt={hero.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="space-y-4 p-8">

                <div className="flex items-center gap-4 text-sm text-muted-foreground">

                  <span className="flex items-center gap-2">

                    <Calendar className="h-4 w-4" />

                    {hero.published_at
                      ? format(
                          new Date(hero.published_at),
                          "dd MMM yyyy"
                        )
                      : "Draft"}

                  </span>

                </div>

                <h3 className="text-3xl font-bold transition-colors group-hover:text-primary">
                  {hero.title}
                </h3>

                <p className="line-clamp-3 text-muted-foreground">
                  {hero.summary}
                </p>

              </div>

            </article>

          </Link>

          {/* Secondary Cards */}

          <div className="space-y-6">

            {others.map((notice) => (

              <Link
                key={notice.id}
                href={`/notices/${notice.slug}`}
              >

                <article className="flex gap-4 rounded-2xl border bg-background p-4 transition hover:shadow-lg">

                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">

                    <Image
                      src={
                        notice.thumbnail ??
                        "/images/placeholder-notice.jpg"
                      }
                      alt={notice.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />

                  </div>

                  <div className="flex flex-col justify-center">

                    <h4 className="line-clamp-2 font-semibold">
                      {notice.title}
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground">

                      {notice.published_at &&
                        format(
                          new Date(notice.published_at),
                          "dd MMM yyyy"
                        )}

                    </p>

                  </div>

                </article>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
