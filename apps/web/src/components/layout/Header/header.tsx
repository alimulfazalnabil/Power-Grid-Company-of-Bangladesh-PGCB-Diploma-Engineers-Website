'use client';

import { Logo } from '../Logo';
import Navbar from '../Navbar';
import MobileMenu from '../Navbar/mobile-menu';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/80 bg-slate-950/90 backdrop-blur-xl transition duration-300">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-6">
          <Logo />
          <div className="hidden lg:block">
            <Navbar />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/search"
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            Search
          </a>
          <a
            href="/login"
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90"
          >
            Login
          </a>
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
