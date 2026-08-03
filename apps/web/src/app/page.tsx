import { Button } from '@pgcb/ui';

const features = [
  {
    title: 'Announcements',
    description: 'Highlight important news, events, and updates for diploma engineers across the PGCB network.',
  },
  {
    title: 'Responsive design',
    description: 'Built mobile-first so visitors can access the site from any device with polished typography and layout.',
  },
  {
    title: 'FastAPI integration',
    description: 'Connect the public website to backend APIs for news, gallery, publications, and member dashboards.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:px-10 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">PGCB Public Website</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Welcome to the Power Grid Company of Bangladesh portal.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              A modern public website for diploma engineers, designed to showcase announcements, publications, gallery highlights, and organization updates.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button">View latest news</Button>
            <Button variant="secondary" type="button">
              Explore the CMS
            </Button>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40"
            >
              <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-4 text-slate-300">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Sprint 2.1 preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Building the public website foundation.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Next we’ll add global layout, hero carousel, announcement bar, footer, theme support, and API-driven content for the PGCB portal.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 px-6 py-5 text-slate-200 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Current status</p>
              <p className="mt-3 text-2xl font-semibold text-white">Public website scaffolding ready</p>
              <p className="mt-2 text-sm text-slate-400">The frontend entrypoint and hero experience are now in place.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
