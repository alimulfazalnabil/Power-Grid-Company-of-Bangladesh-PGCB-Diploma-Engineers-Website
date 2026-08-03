export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 text-center">
      <div className="max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/40">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-400">PGCB Portal</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          A modern platform for diploma engineers.
        </h1>
        <p className="mt-6 text-lg text-slate-300">
          This starter app is ready for the Next.js, Tailwind, and shadcn-style experience you requested.
        </p>
      </div>
    </main>
  );
}
