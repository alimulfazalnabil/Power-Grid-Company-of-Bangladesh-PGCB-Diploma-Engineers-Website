import Link from 'next/link';

const sliders = [
  {
    id: 'slider-1',
    title: 'Welcome to PGCB',
    status: 'Published',
  },
  {
    id: 'slider-2',
    title: 'Join the Professional Network',
    status: 'Published',
  },
];

export default function SlidersPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-700">Hero Slider</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage homepage slides</h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Create, edit, and publish the rotating hero content shown on the public homepage.
              </p>
            </div>
            <Link
              href="/sliders/create"
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              New Slide
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {sliders.map((slider) => (
                <tr key={slider.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">{slider.title}</td>
                  <td className="px-6 py-4 text-slate-600">{slider.status}</td>
                  <td className="px-6 py-4">
                    <Link href="/sliders/edit" className="text-teal-700 transition hover:text-teal-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
