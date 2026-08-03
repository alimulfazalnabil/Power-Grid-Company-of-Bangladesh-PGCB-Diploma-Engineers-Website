export default function CmsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-semibold">PGCB CMS Dashboard</h1>
        <p className="mt-4 text-slate-600">Content management experience for the portal.</p>
        <a
          href="/sliders"
          className="mt-6 inline-flex rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          Manage sliders
        </a>
      </div>
    </main>
  );
}
