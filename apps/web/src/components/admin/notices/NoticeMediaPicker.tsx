interface Props {
  form: unknown;
}

export function NoticeMediaPicker({}: Props) {
  return (
    <section className="rounded-xl border p-4">
      <h3 className="text-base font-semibold">Media</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Media selection will be wired here.
      </p>
    </section>
  );
}