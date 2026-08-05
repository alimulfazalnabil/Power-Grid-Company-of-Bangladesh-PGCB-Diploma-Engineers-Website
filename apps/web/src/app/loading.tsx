export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8">
        <div className="h-72 animate-pulse rounded-3xl border border-white/10 bg-slate-900/70" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="h-52 animate-pulse rounded-3xl border border-white/10 bg-slate-900/70" />
          <div className="h-52 animate-pulse rounded-3xl border border-white/10 bg-slate-900/70" />
          <div className="h-52 animate-pulse rounded-3xl border border-white/10 bg-slate-900/70" />
        </div>
      </div>
    </main>
  );
}
