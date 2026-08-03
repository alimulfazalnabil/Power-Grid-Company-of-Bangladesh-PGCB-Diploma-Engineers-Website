import clsx from 'clsx';
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

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav className={clsx('flex flex-wrap items-center gap-3 text-sm font-medium', className)}>
      {navItems.map((item) => (
        <NavItem key={item.id} href={item.href} title={item.title} />
      ))}
    </nav>
  );
}
