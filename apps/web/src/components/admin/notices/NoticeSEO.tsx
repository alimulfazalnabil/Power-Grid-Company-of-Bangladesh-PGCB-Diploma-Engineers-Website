interface Props {
  form: unknown;
}

export function NoticeSEO({}: Props) {
  return (
    <section className="rounded-xl border p-4">
      <h3 className="text-base font-semibold">SEO</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        SEO settings will be wired here.
      </p>
    </section>
  );
}