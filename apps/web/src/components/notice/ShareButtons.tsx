interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  return (
    <section className="mt-12 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-semibold">Share this notice</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Sharing options for {title} ({slug}) will appear here.
      </p>
    </section>
  );
}