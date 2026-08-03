import type { Metadata } from 'next';

import AnnouncementBar from '../src/components/layout/AnnouncementBar';
import Header from '../src/components/layout/Header';
import { HeroSlider } from '../src/components/hero';
import TopBar from '../src/components/layout/TopBar';

const homepageSections = [
  {
    title: 'Latest Notices',
    description:
      'A dedicated notice board will surface time-sensitive updates, circulars, and service announcements for the PGCB engineering community.',
    href: '/notices',
    action: 'View notices',
  },
  {
    title: 'About Association',
    description:
      'The association overview will explain mission, leadership, and the role of diploma engineers across the grid.',
    href: '/about',
    action: 'Learn more',
  },
  {
    title: 'Statistics',
    description:
      'Key metrics and membership figures will be added here as structured content blocks driven by backend data.',
    href: '/statistics',
    action: 'Explore stats',
  },
  {
    title: 'Executive Committee',
    description:
      'Leadership profiles and committee members will be presented in a clean editorial layout.',
    href: '/committee',
    action: 'Meet the team',
  },
  {
    title: 'Publications',
    description:
      'Reports, documents, and downloadable resources will be organized for quick access.',
    href: '/publications',
    action: 'Browse publications',
  },
  {
    title: 'Gallery and Partners',
    description:
      'Event imagery and institutional partners will round out the public homepage as supporting sections.',
    href: '/gallery',
    action: 'Open gallery',
  },
];

export const metadata: Metadata = {
  title: 'Professional Engineers Association',
  description: 'Official website of the Professional Engineers Association.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <AnnouncementBar />
      <TopBar />
      <Header />
      <HeroSlider />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-10 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary">PGCB Public Website</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            A modern public homepage for diploma engineers across the PGCB network.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            The homepage now follows a clean server-rendered structure: interactive hero content at the top,
            followed by focused sections for notices, association information, statistics, leadership,
            publications, gallery content, and partners.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/notices"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
            >
              View notices
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-5 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:bg-slate-900"
            >
              About the association
            </a>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {homepageSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40 transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">Homepage section</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-slate-300">{section.description}</p>
              <a
                href={section.href}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                {section.action}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-primary/20 px-6 py-10 shadow-xl shadow-slate-950/40 sm:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary">Homepage roadmap</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            The notice board will be the next full production module.
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            The current page now establishes the final homepage structure around the existing hero
            experience. The next implementation pass can add dedicated notice components without
            changing the page architecture again.
          </p>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          <p>Professional Engineers Association. Built for a scalable, section-driven public portal.</p>
        </footer>
      </div>
    </main>
  );
}
