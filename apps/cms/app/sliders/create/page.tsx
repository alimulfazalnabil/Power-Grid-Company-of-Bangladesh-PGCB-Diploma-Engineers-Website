import Link from 'next/link';

export default function CreateSliderPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900 md:p-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-700">Hero Slider</p>
        <h1 className="mt-3 text-3xl font-semibold">Create slide</h1>
        <p className="mt-3 text-slate-600">This route will host the slider creation form in the next CMS iteration.</p>
        <Link href="/sliders" className="mt-6 inline-flex text-teal-700 transition hover:text-teal-900">
          Back to sliders
        </Link>
      </div>
    </main>
  );
}
