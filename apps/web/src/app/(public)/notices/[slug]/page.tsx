import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Eye } from "lucide-react";
import { format } from "date-fns";

import { noticeService } from "@/services/notice.service";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { NoticeAttachments } from "@/components/notice/NoticeAttachments";
import { RelatedNotices } from "@/components/notice/RelatedNotices";
import { ShareButtons } from "@/components/notice/ShareButtons";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: Props) {
  try {
    const notice = await noticeService.getBySlug(
      params.slug
    );

    return {
      title: notice.title,
      description: notice.summary,

      openGraph: {
        title: notice.title,
        description: notice.summary,
        images: notice.thumbnail
          ? [notice.thumbnail]
          : [],
      },

      twitter: {
        card: "summary_large_image",
        title: notice.title,
        description: notice.summary,
      },
    };
  } catch {
    return {
      title: "Notice",
    };
  }
}

export default async function NoticeDetailPage({
  params,
}: Props) {

  let notice;

  try {
    notice = await noticeService.getBySlug(
      params.slug
    );
  } catch {
    notFound();
  }

  return (
    <main className="container mx-auto py-12">

      <Breadcrumbs
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Notices",
            href: "/notices",
          },
          {
            title: notice.title,
          },
        ]}
      />

      <article className="mx-auto max-w-5xl">

        {notice.thumbnail && (

          <div className="relative mb-10 aspect-[16/9]">

            <Image
              src={notice.thumbnail}
              alt={notice.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="rounded-xl object-cover"
            />

          </div>

        )}

        <h1 className="mb-6 text-5xl font-bold">
          {notice.title}
        </h1>

        <div
          className="
            mb-8
            flex
            flex-wrap
            gap-6
            text-muted-foreground
          "
        >
          <div className="flex items-center gap-2">

            <Calendar size={18} />

            {notice.published_at
              ? format(
                  new Date(
                    notice.published_at
                  ),
                  "dd MMM yyyy"
                )
              : "Draft"}

          </div>

          <div className="flex items-center gap-2">

            <Eye size={18} />

            {notice.view_count} Views

          </div>

        </div>

        <div
          className="
            prose
            prose-lg
            dark:prose-invert
            max-w-none
          "
          dangerouslySetInnerHTML={{
            __html: notice.content,
          }}
        />

        <NoticeAttachments
          noticeId={notice.id}
        />

        <ShareButtons
          title={notice.title}
          slug={notice.slug}
        />

        <RelatedNotices
          noticeId={notice.id}
          categoryId={notice.category_id}
        />

      </article>

    </main>
  );
}
