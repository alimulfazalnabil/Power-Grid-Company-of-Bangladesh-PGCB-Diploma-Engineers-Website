interface Props {
  form: unknown;
}

export function NoticePublishPanel({}: Props) {
  return (
    <section className="rounded-xl border p-4">
      <h3 className="text-base font-semibold">Publish</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Publish controls will be wired here.
      </p>
    </section>
  );
}