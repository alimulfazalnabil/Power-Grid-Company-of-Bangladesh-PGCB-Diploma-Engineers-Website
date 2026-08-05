interface NoticeAttachmentsProps {
  noticeId: string | number;
}

export function NoticeAttachments({ noticeId }: NoticeAttachmentsProps) {
  return (
    <section className="mt-12 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-semibold">Attachments</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Attachments for notice {noticeId} will appear here.
      </p>
    </section>
  );
}