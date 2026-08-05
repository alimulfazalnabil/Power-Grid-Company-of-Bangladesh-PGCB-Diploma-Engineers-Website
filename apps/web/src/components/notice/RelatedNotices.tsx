interface RelatedNoticesProps {
  noticeId: string | number;
  categoryId: string | number | null;
}

export function RelatedNotices({ noticeId, categoryId }: RelatedNoticesProps) {
  return (
    <section className="mt-12 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-semibold">Related notices</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Related notices for {noticeId}
        {categoryId ? ` in category ${categoryId}` : ""} will appear here.
      </p>
    </section>
  );
}