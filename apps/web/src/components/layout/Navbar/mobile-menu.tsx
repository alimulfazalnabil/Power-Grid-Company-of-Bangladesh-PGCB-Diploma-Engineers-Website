'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import NavItem from './nav-item';
import { NavigationItem } from '../../../types/navigation';

const navItems: NavigationItem[] = [
  { id: 'home', title: 'Home', href: '/' },
  { id: 'about', title: 'About', href: '/about' },
  { id: 'committee', title: 'Committee', href: '/committee' },
  { id: 'membership', title: 'Membership', href: '/membership' },
  { id: 'notices', title: 'Notices', href: '/notices' },
  { id: 'gallery', title: 'Gallery', href: '/gallery' },
  { id: 'publications', title: 'Publications', href: '/publications' },
  { id: 'contact', title: 'Contact', href: '/contact' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/95 text-slate-100 transition hover:bg-slate-800"
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={twMerge(
          'mt-3 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95 transition-all duration-300',
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {navItems.map((item) => (
            <NavItem key={item.id} href={item.href} title={item.title} className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
